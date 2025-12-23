---
title: 'A deep dive on Privacy protocols'
description: 'Analytic comparasion betweeen Tornado Cash and Privacy Pools'
publishDate: '23 December 2025'
tags: ['Cryptography', 'Privacy']
ogImage: '/images/merkle_tree.jpg'
---

For this post, we would analize the current version of Privacy Pools and the first version of Tornado Cash

# Analysis

## Anonymity Model

To define the scope of this discussion, the following example should clarify what it meant by an anonymity model:

_Given an external observer, which linkages are prevented and what information remains observable?_

Tornado cash and Privacy pools primarily differ in **which information remains observable** and **how the exposure of such information constrains their anonymity guarantees**.
### Tornado Cash

Tornado Cash achieves transaction unlinkability by preventing direct association between deposits and withdrawals through ZK Proofs of Merkle tree membership. Each deposit generates a commitment that is appended as a leaf in a public Merkle tree, while withdrawals require a ZK Proof demonstrating ownership of a valid, unspent commitment, without revealing which specific leaf is being spent.

Under standard operational assumptions, including:
1. The users employ distinct, un-linked addresses for deposits and withdrawals
2. A sufficient time interval is introduced between deposit and withdrawals to prevent temporal correlation.

The protocol guarantees that an external observer cannot link a withdrawal to a specific deposit. In this model, **privacy is achieved by making all withdrawals cryptographically indistinguishable from one another**.

However Tornado Cash exposes several forms of side information: deposits and withdrawals remain publicly observable events, and both the anonymity set size and the pool denomination are fixed and publicly known.

A crucial characteristic of Tornado Cash is  its anonymity set. The anonymity set is defined as the set of all unspent commitments in the protocol and is both global and indivisible, meaning that all users necessarily share the same set.

As a consequence, Tornado Cash does not support selective disassociation. A user who wishes to demonstrate that their funds are not linked to a particular subset of deposits (e.g., deposits associated with illicit activity) has no mechanism to do so without revealing additional information. In practice, any attempt to prove non-association requires full deanonymization. This limitation is not an implementation artifact, but rather **a fundamental constraint imposed by Tornado Cash’s anonymity model.**
### Privacy pools

Privacy pools preserve the same baseline anonymity guarantees as Tornado Cash, namely deposit-withdrawal unlinkability achieved through ZK Proofs. Users can deposit and withdraw funds without revealing a direct link between the two actions, and similar categories of side information remain observable to external parties.

However, Privacy Pools extend this anonymity model with additional expressiveness. In particular, they support partial withdrawals without leaking information about the original deposit, and allow users to generate  ZK proofs of **membership with respect to a custom associations set**, enabling selective disassociation from undesired deposits.

**Disclaimer:** Conceptually, association sets resemble _Sparse Merkle Trees_ [3], where membership is proven relative to a specific root representing a filtered subset of deposits. However, in practice, Privacy Pools rely on incremental Merkle Trees (LeanIMTs) and enforce exclusion at the set-construction level, rather than through explicit cryptographic non-membership proofs.

This extension fundamentally alters the anonimity model. Rather than relying on a single global anonymity set, users may choose an associations set that satisfies external constrains (e.g., regulatory or social consensus) while remaining anonymous within that set.

As a result, Privacy pools enable a model more  suitable for real world applications than Tornado cash. As stated by Buterin et al  _"honest users are strongly incentivized to prove membership in a given, compliant association set, while still enjoying privacy within that set. Conversely, for dishonest users it is impossible to provide such a proof”_ [1]. 

_In summary, Tornado cash maximizes anonymity through a single undifferentiated anonymity set, whereas Privacy pools trade some uniformity for expressiveness, enabling selective disclosure without full deanonymization_
## Security 

Both protocols, Tornado Cash and Privacy pools relies on similar cryptographic primitives and trust assumptions, the introduction of additional expressiveness in Privacy pools modifies the attack surface and introduce new deanonymization vectors that do not exist in Tornado cash. 
### Tornado Cash

Tornado cash relies primarily on the assumption that the global anonymity set is sufficiently large to obfuscate any linkage between deposits and withdrawals. As stated before, under correct usage, namely, avoiding address reuse, introducing adequate time delays, and selecting common denominations, the protocol provides strong unlinkability guarantees.

From a security perspective, the main attack surfaces are the correctnes of the deployed smart contracts and the integrity of the ZK circuits used to verify Merkle membership proofs. Any issue in these components could compromise either fund safety or privacy guarantees.

At the user level, security failures may arise from poor key management. If a user's secret or commitment data is leaked, an attacker can generate a valid withdrawal proof and steal the funds, although this does not necessarily deanonymize the original user.

Regarding deanonymization vectors, Tornado Cash exhibits a distinctive property: even if a user follows all recommended practices, deanonymization becomes unavoidable if the user is required to explicitly prove linkage or non-linkage between a specific deposit or withdrawal.
### Privacy pools

Privacy pools inherit the same cryptographic assumptions as Tornado Cash; however, the increased expressiveness of the protocol introduces additional trade-offs and, consequently, new security considerations.

In particular, Privacy pools rely on specific association sets, which may be significantly smaller than the global anonymity set. As a result, anonymity guarantees become more sensitive to configuration choices. Poorly constructed association sets or overly restrictive constraints, can weaken privacy guarantees and increase the feasibility of deanonymization attacks.

Moreover, because association sets and their corresponding roots may be provided by third parties or associations set providers, malicious or negligent set construction could unintentionally leak information or amplify inference attacks.

As noted by Buterin et al., insufficiently large association sets and improper root selection, combined with user errors, may allow a motivated attacker to probabilistically link a withdrawal to a specific deposit, even in the absence of explicit disclosure [1].

_Overall, Privacy pools expands the attack surface relative to Tornado cash as a direct consequence of increased expressiveness, making anonymity guarantees more dependent on correct configuration and user behavior._
## Compliance stance
### Tornado Cash

Tornado Cash adopts a reactive compliance model. While users may choose to demonstrate compliance when required by a regulator or intermediary, doing so necessarily involves revealing the linkage between a specific deposit and its corresponding withdrawal. As a result, compliance can only be achieved at the cost of full deanonymization.

This limitation is not incidental, but rather a direct consequence of Tornado Cash's undifferentiated anonymity model, which provides no mechanism for selective disclosure or partial non-association
### Privacy pools

Privacy pools introduce a proactive compliance model. Instead of requiring full disclosure upon request, users can voluntary generate ZK proofs demonstrating that their funds are not associated with specific illicit entities or originate from a compliant association set.

These proofs allow users to establish regulatory compliance without revealing their identity or transaction history. As a result, Privacy pools enable regulatory compliance to be demonstrated in advance rather than reactively, while preserving anonymity within a chosen association set.
## Composability

Both Tornado Cash and Privacy Pools impose similar baseline UX constraints, primarily derived from their reliance on ZK proofs and user-managed secrets. In both systems, users must securely store private data and generate proofs locally, which already introduces friction compared to standard wallet interactions.
### Tornado Cash

Tornado Cash has several UX limitations that negatively impact composability. Deposits must be made using fixed,  predefined denominations which forces users to split value across multiple deposits in order to handle variable amounts. Each deposit represents an isolated unit of value, increasing the number of required transactions and proofs for common usage patterns.

Additionally, users are fully responsible for managing their secrets. loss or leakage of this information can result in permanent loss of funds, making Tornado Cash unsuitable for frequent or casual usage.
### Privacy pools

Privacy pools improve composability by supporting arbitrary deposit amounts, partial withdrawals, and the merging of multiple deposits into a single withdrawal. These features significantly reduce transactional overhead and make the protocol easier to integrate with dApps that require flexible value transfers, such as swaps or payments.

However, the increased expressiveness introduces additional operational constraints. In order to support compliance-oriented uses cases, Privacy pools propose mechanisms such as delayed inclusion into association sets. For example, deposits may only be added to compliant associations set after a fixed delay (e.g., seven days) while deposits linked to known illicit activity are permanently excluded. Such mechanisms, which may rely on community-curated lists or transaction screening service providers, introduces latency and complexity that can negatively affect day-to-day usability, particularly for users requiring immediate liquidity.

From a gas efficiency perspective, Privacy Pools further improve composability by leveraging account abstraction techniques, such as batching token approvals and deposits into a single transaction. In practical usage, this reduces the number of on-chain interactions required for common workflows.

In empirical tests conducted on Ethereum mainnet, a Tornado Cash deposit of 100 USDC consumed approximately 975,643 gas units, while Privacy Pools deposit consumed approximately 395,557 gas units.

The measurements were obtained via Tenderly simulations of the perspective `deposit` contract calls, isolating the on-chain execution cost of the deposit operation and excluding approval transactions and off-chain relayer fees.

Prior work has shown that Tornado Cash deposit operation can consume up to approximately ~915,352 gas units under the experimental  conditions analyzed by Yang et al. [2]. Our empirical measurements are consistent with this order of magnitude and further confirm that Tornado Cash deposits incur substantially higher gas costs than Privacy Pools under comparable conditions.

Overall, while both protocols share similar UX constraints, Privacy Pools offer a more composable and gas-efficient primitive for real-world applications.
## Design
### Non-compliance proposal

This idealized scenario is particularly interesting because it allows us to maximize privacy guarantees without introducing the additional constraints imposed by regulatory compliance. Many of the attack vectors and design trade-offs present in Privacy Pools arise precisely from the expressiveness required to support selective disclosure and compliance proofs. By removing this requirement, we can explore a privacy-first design space more freely.

An ideal private transfer and swap protocol in a non-compliance setting should satisfy the following core properties:
- End-to-end shielded transactions, where the sender, recipient and transferred amount are fully private.
- A global anonymity set, maximizing the number of indistinguishable transactions and minimizing information leakage.
- Native support for balance merge and split operations, which is essential for usability and avoiding denomination-based deanonymization.
- Privacy guarantees that do not rely solely on correct user behavior, but are enforced at the protocol level.

The goal of this proposal is not to exhaustively solve every challenge inherent to privacy-preserving systems, but rather to outline a design that addresses the most fundamental limitations observed in existing protocols.


... OMG I NEED CREATIVITY NOW, CREATIVITY COME TO MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

(If you see this, I'm taking my time to think :b) 


### Compliance proposal

[1] V. Buterin, J. Illum, M. Nadler, F. Schär, and A. Soleimani,
    “Blockchain Privacy and Regulatory Compliance: Towards a Practical Equilibrium,”
    SSRN, 2024. [Online]. Available: https://ssrn.com/abstract=4563364

[2] J. Yang, S. Gao, G. Li, R. Song, and B. Xiao, “Reducing Gas Consumption of Tornado Cash and Other Smart Contracts in Ethereum,” in *2022 IEEE International Conference on Trust, Security and Privacy in Computing and Communications (TrustCom)*, pp. 921–927, 2022. Available: https://www4.comp.polyu.edu.hk/~shanggao//publications/Reducing_Gas_Consumption_of_Tornado_Cash_and_Other_Smart_Contracts_in_Ethereum.pdf 

[3] J. Manco "Sparse Merkle Trees" 2025 "Internal repository note."