---
title: 'ECDSA (Eliptic Curves signatures)'
description: 'Deep dive into ECDSA'
pubDate: 'Dec 11 2024'
heroImage: '/ECDSA.png'
---


Una curva elíptica sobre un **campo finito** $\mathbb{F}_{p}$ se define por la ecuación de **Weierstrass estándar:**
$$
y^2 = x^3 + ax + b
$$
Donde $a$ y $b$ son constantes que determinan la forma de la curva, todos los puntos que satisfacen esta ecuación.

Este tipo de curvas se usan en cripto-sistemas como **ECDSA (Elliptic Curve Digital Signature Algorithm)** por la dificultad de resolución del problema del logaritmo discreto en curvas elípticas.

## Curvas elípticas en criptografía
Las curvas elípticas han ganado popularidad sobre métodos clásicos como **RSA** debido a que proporcionan un nivel equivalente o superior de seguridad con tamaños de llave significativamente menores. Por ejemplo, una clave de **256 bits en ECDSA** ofrece una seguridad comparable a la de una clave **RSA de 3072 bits**. Esto implica un ahorro en ancho de banda, tiempo de cómputo y espacio de almacenamiento. Además, el problema del logaritmo discreto en curvas elípticas **(ECDLP)** es considerado más difícil de resolver que el problema del logaritmo discreto clásico **(DLP)** en los enteros módulo **$p$**, por lo que a igualdad de recursos computacionales, las curvas elípticas presentan una barrera de **seguridad más alta**.

## Estructura de Grupo en Curvas Elípticas

Para la construcción de la estructura algebraica usada en **ECDSA** debemos definir un grupo abeliano sobre la curva.
### Definición de grupo abeliano
Un grupo abeliano es una estructura algebraica ($\mathbb{G}, \oplus$), donde:
- $\mathbb{G}$ es un conjunto no vacío
- $\oplus$ es una operación binaria definida en $\oplus : \mathbb{G} \times \mathbb{G} \to \mathbb{G}$
Que satisface las siguientes propiedades
- **Asociatividad:** $\forall a,b,c \in \mathbb{G}, (a \oplus b) \oplus c = a \oplus (b \oplus c)$ 
- **Elemento identidad:** $\exists e \in \mathbb{G} \mid \forall a \in \mathbb{G}, e \oplus a = a \oplus e = a$
- **Elemento inverso:** $\forall a \in \mathbb{G}, \exists b \in \mathbb{G} \mid a \oplus b = b \oplus a = e$
- **Conmutatividad:** $\forall a,b \in \mathbb{G}, a \oplus b = b \oplus a$

### Construcción
Sobre estas curvas elípticas podemos definir una estructura algebraica de grupo abeliano de la siguiente forma:
Sea $C$ una curva elíptica sobre un campo $\mathbb{F}_{p}$ definida por la ecuación de **Weierstrass estándar**
$$
y^2 = x^3 + ax + b
$$
Donde $a,b \in \mathbb{F}_{p}$ y la curva es no singular (sin puntos con múltiples tangentes)
Consideremos los puntos $P = (x_{p},y_{p})$ y $Q = (x_{q}, y_{q})$ tal que $P,Q \in C$ 
La operación binaria $\oplus: C \times C \to C$ se define como:

En el caso de que $P \neq Q$ y $x_{p} \neq x_{ q}$
1. Calcular pendiente entre los 2 puntos
$$
m = \frac{y_{q}- y_{p}}{x_{q}-x_{p}}
$$
2. Calcular coordenadas de punto $R$
$$
x_{r } = m^2-x_{p}-x_{q} \qquad y_{r} = m(x_{p}-x_{r})-y_{p} 
$$
Por tanto:
$$
P \oplus Q = (x_{r}, y_{r}) = R
$$
En el caso especial de que $P = Q$ entonces la pendiente entre $P$ y $Q$ es simplemente la derivada de la ecuación de la curva sobre el punto $x_{p}$, de este modo:
$$
y^2=x^3+ax+b.
$$
$$
2y\frac{dy}{dx} = 3x^2 + a
$$
$$
\frac{dy}{dx} = \frac{3x^2+a}{2y} \implies m = \frac{3x_{p}^2 + a}{2y_{p}}
$$
Sustituyendo estos valores de $m$ se obtiene 
$$
P \oplus Q  = P \oplus P = 2P = (x_{r},y_{r})
$$
Ahora definimos un punto $\mathcal{O}$ en el infinito sobre el plano proyectivo, este punto cumple las siguientes propiedades
$$
P \oplus \mathcal{O} = P \qquad \mathcal{O} \oplus Q = Q 
$$  
Si $P = (x, y)$ y $Q(x,-y)$ entonces
$$
P \oplus Q = \mathcal{O}
$$
Con este punto $\mathcal{O}$ obtenemos el elemento neutro, necesario para que la estructura que definimos sea un grupo abeliano.

Note que "la multiplicación por escalar" sobre esta estructura, se define como:
Dado un punto $P \in C$ y un múltiplo escalar $k \in \mathbb{Z}$, tenemos que:
$$
k\cdot P = \sum_{n=1}^{k} P \oplus P 
$$

## La Seguridad en Curvas Elípticas: Elliptic-Curve Discrete Logarithm Problem (ECDLP)

La seguridad de este esquema de firmado se respalda enteramente en el problema **ECDLP** el cual esta definido como:
- Dada una curva elíptica sobre el campo finito $\mathbb{F}_{p}$, un punto generador $G$ en la curva y un punto $P$ en la curva, encontrar el entero $k$ tal que $P = k \cdot G$ 
Para campos finitos seleccionados rigurosamente, este problema no tiene solución óptima.

La multiplicación sobre puntos de la curva elíptica en el grupo $\mathbb{F}_{p}$ es similar a la **exponenciación** en el grupo $\mathbb{Z}_{p}$ (Enteros modulo $p$).

$$
\sum_{i=1}^{k} G  = k \cdot G = P
$$
Del mismo modo en el grupo $\mathbb{Z}_{p}$
$$
\sum_{i=1}^{k} a = a ^ k \text{ mod } p  = b
$$
El problema **ECDLP** es análogo al problema de **DLP** (Discrete logarithm problem) en $\mathbb{Z}_{p}$.

Aunque **ECDLP** tiene mayor dificultad por la forma en la que se construyen las sumas, ya que no es una operación algebraica sino geométrica, por tanto no existe una operación inversa linealmente alcanzable.

Note que la dificultad de el **ECDLP** depende en gran parte del tamaño del campo $\mathbb{F}_{p}$ y una selección rigurosa de la curva, como por ejemplo **secp256k1**.


## Llaves criptográficas en curvas elípticas
### Llaves privadas
Las **llaves privadas** son enteros seleccionados dentro del rango del tamaño de la curva generalmente son enteros de **256-bit**.

La generación de estas llaves es extremadamente rápida y eficiente.
### Llaves públicas

Las llaves públicas son puntos de la curva elíptica, y estos puntos están definidos por coordenadas $(x,y)$. Debido a las propiedades de esta familia de curvas, los puntos se pueden expresar en una versión comprimida de una sola coordenada $x$ y una bandera que indica si $y$ es positivo o negativo, por tanto a una llave privada de **256-bit** le corresponde una llave publica de **257-bit**.

>La propiedad específica que permite esta compresión es la **simetría respecto al eje $x$**. Esto se debe a que, para una curva elíptica $C$ definida por $y^2 = x^3 + ax + b$, para cada valor de $x$ (dentro del dominio válido de la curva) tiene como máximo dos valores posibles de $y$, que son opuestos: $y$ y $-y$. Esta simetría permite almacenar únicamente $x$ y un bit adicional que indique el signo de $y$.
>

### Generador y orden

En una curva elíptica se define un punto $G$ **(generador)** y un $n$ **(orden)**; que define el numero de puntos en la curva.
Para un generador $G$ existe un $r \in \mathbb{Z}^+$ tal que $r \cdot G = O$ con $r\space | \space n$  llamado orden del subgrupo generado por $G$, decimos que $G$ es un generador del grupo completo si $r = n$.

### Derivación de llaves

Dado un generador $G$ y un número entero $k$ **(Llave privada)**, es posible calcular un punto que pertenece a la curva elíptica
$$
P = k\cdot G
$$
Esta operación consiste en la suma de el punto $G$ consigo mismo $k$ veces.

Note que calcular $k$ dados los puntos $G$ y $P$ es computacionalmente inviable, ya que:
1. No existe una operación inversa definida sobre el grupo tal que $k = \frac{P}{G}$
2. La única forma conocida de encontrar $k$ es mediante fuerza bruta o algoritmos especializados, lo que garantiza la seguridad del esquema.

## ECDSA: Firmas Digitales con Curvas Elípticas
Para este tipo de casos usamos curvas conocidas, como por ejemplo **secp256k1**.

### Generación

Para la firma de un mensaje se sigue el siguiente proceso:
1. Calcular el hash del **mensaje** ($m$) usando **SHA-256** (Secure Hash Algorithm) $h = \text{hash}(m)$
2. Generar un **número aleatorio** $c$ en el rango de la curva ($[1, n-1]$)
3. Calcular el punto $R = c \cdot G$ y tomar la **coordenada $x$ del punto $P$** como $r$
4. Calcular la **prueba de la firma** $s = c^{-1} (h + r \cdot k) \text{ mod } n$, tenga en cuenta que $c^{-1}$ es igual a un entero tal que $c \cdot c^{-1} = 1 \text{ mod } n$ y $k$ es la llave privada del firmante
5. La firma es el par $(r,s)$ 
#### Consideraciones
Note que si el **número aleatorio** $c$ se genera de formas poco entrópicas, es decir, si es predecible o se repite, el sistema es vulnerable a filtrar la llave privada del firmante.
 
### Verificación

Para verificar la firma se toma como input el **mensaje** ($m$), la **llave publica** ($P$) y la **firma** $(r,s)$
1. Calcular el hash del **mensaje** ($m$) usando **SHA-256** (Secure Hash Algorithm) $h = \text{hash}(m)$
2. Calcular el inverso modular de la prueba de la firma $s^{-1} \text{ mod } n$ 
3. Recuperar el punto random $R$ usado durante la firma $R' = (h \cdot s^{-1}) \cdot G  + (r \cdot s^{-1}) * P$ 
4. Tomar la **coordenada $x$ del punto $R'$** como $r'$
5. La firma es válida si $r = r'$

Es posible recuperar la llave publica $P$ a partir de la firma.

#### Consideraciones
Note que hallar $r$ y $s$ mediante fuerza bruta es totalmente inviable

### Implementación
A continuación una implementación simple en Solidity:

```solidity

function verifySignature(bytes32 message, uint8 v, bytes32 r, bytes32 s) public view returns (bool) {
    bytes32 hash = sha256(abi.encodePacked(message));
    return ecrecover(hash, v, r, s) == msg.sender;
}

```

## Conclusión
Las curvas elípticas ofrecen alta seguridad y eficiencia para objetivos criptográficos debido a que su estructura algebraico-geométrica dificulta el desarrollo de algoritmos capaces de resolver el **ECDLP** de forma rápida. Por otro lado, **ECDSA** utiliza llaves más cortas que otros sistemas equivalentes, como **RSA**, lo que ha convertido a **ECDSA** en un estándar en la industria de la criptografía.



#Computing  #Math/Cryptography #Math/Discrete 