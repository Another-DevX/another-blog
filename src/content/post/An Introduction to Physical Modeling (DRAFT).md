---
title: 'An Introduction to Physical Modeling (DRAFT)'
description: 'A brief introduction to physical modeling using the classical three-body problem as a case study. This post explores the mathematical formulation and numerical methods involved in simulating gravitational interactions.'
publishDate: '3 April 2025'
tags: ['Physics', 'Numerical Methods']
# ogImage: '/images/ECDSA.png'
---

# 1. Introduction

This is a brief exploration into the process of modeling a physics problem using numerical methods and physical theory.  
In this blog, we explore a classic and intricate problem in physics: the **Three-body Problem** (TBP) and its simplified variant, the **Restricted Three-body Problem** (RTBP).

# 2. Physical motivation and problem setup

What is the three-body problem? This is a fundamental question to consider before attempting any modeling, since it is difficult to describe a system we do not yet understand.

A **TBP** consists of three bodies with specific masses, initial velocities, and initial positions, all affected by a gravitational field.

This system is governed by **Newton's law of universal gravitation**.  

The **vector form** of Newton's law, describing the force exerted on a body by another, is given by:

$$
\vec{F}_{12} = -\frac{Gm_{1}m_{2}}{|\vec{r}_1 - \vec{r}_2|^3}(\vec{r}_1 - \vec{r}_2)
$$

where $\vec{F}_{12}$ is the force on body 1 due to body 2, and $\vec{r}_i$ denotes the position vector of body $i$. This expression reflects both the **magnitude** and the **direction** of the gravitational interaction.

Given the initial data: masses, positions, and velocities, it is possible to describe the evolution of the system using Newton's laws. Specifically, we compute the acceleration of each body by summing the gravitational forces exerted by the other two.

For example, the acceleration of body 1 due to bodies 2 and 3 is given by:

$$
\vec{a}_1 = -\frac{Gm_2}{|\vec{r}_2 - \vec{r}_1|^3}(\vec{r}_2 - \vec{r}_1) 
           -\frac{Gm_3}{|\vec{r}_3 - \vec{r}_1|^3}(\vec{r}_3 - \vec{r}_1)
$$

> **Note:** This formulation follows directly from **Newton's second law**, which relates the net force acting on a body to its acceleration:
>
> $$
> \vec{F} = m\vec{a}
> $$

Taking all this into account, we are left with a system of **second-order ordinary differential equations (ODEs)** for each component of the acceleration. In total, this yields nine **coupled second-order equations**, which are highly impractical to solve analytically. Fortunately, numerical methods allow us to approximate their solutions using computational tools.
