LLN Law of Large Numbers

La legge dei grandi numeri è uno dei concetti fondamentali della teoria della probabilità e della statistica. Si tratta di un principio che descrive il comportamento statistico di una serie di eventi casuali ripetuti e la tendenza dei risultati a stabilizzarsi intorno a un valore medio.


La Legge dei Grandi Numeri indica che all'aumentare del numero di prove o eventi casuali, la media dei risultati osservati tende ad avvicinarsi al valore atteso o alla media teorica.


La legge dei grandi numeri è essenziale nell'analisi statistica in quanto fornisce una comprensione fondamentale del modo in cui le medie di un insieme di dati si comportano all'aumentare delle osservazioni. La sua utilità risiede nel fatto che fornisce un principio guida per la comprensione della casualità e della sua relazione con i risultati attesi nel lungo periodo. 


Legge dei Grandi Numeri debole

La legge dei grandi numeri debole stabilisce che, date un insieme di variabili casuali indipendenti ed identicamente distribuite, la media di tali variabili tende, con un numero elevato di prove, alla media attesa della distribuzione da cui provengono. 

Formalmente, se X1, X2, ... ,Xn sono variabili casuali indipendenti e identicamente distribuite con media  allora la media campionaria Mn delle prime n variabili casuali tende alla media   al crescere di n  secondo la formula:


nP( | Mn -  | >= ) =0

dove P indica la probabilità,  Mn è la media campionaria delle prime n  variabili casuali,   è la media della distribuzione e  è un piccolo numero positivo.

Legge dei Grandi Numeri forte

La legge dei grandi numeri forte afferma che la media campionaria si avvicina alla media attesa non solo in probabilità, ma quasi certamente. In sostanza, afferma che con probabilità 1, la media dei valori osservati converge alla media attesa all'aumentare del numero di prove. 

In formule, la legge dei grandi numeri forti afferma che, dato lo stesso insieme di variabili casuali indipendenti ed identicamente distribuite con media , allora la 
media campionaria  Mn  converge alla media  con probabilità 1 al crescere di n:

nP( | Mn -  | >= ) =0

P(n Mn = ) = 1 


Dimostrazione legge dei Grandi Numeri debole

La legge dei grandi numeri debole si basa sull'idea che, con un numero sufficientemente grande di prove, la media di un insieme di variabili casuali converge alla media attesa di tali variabili.

Per la dimostrazione è necessario introdurre prima due concetti chiave:

Ineguaglianza di Chebyshev:
L'ineguaglianza di Chebyshev fornisce una relazione tra la deviazione standard di una variabile casuale e la probabilità che la variabile si discosti dalla sua media. 
Afferma che la probabilità che una variabile casuale si discosti dalla sua media di più di un certo numero di deviazioni standard è limitata.

Proprietà di convergenza in Probabilità:
La convergenza in probabilità afferma che, al crescere del numero di osservazioni, la probabilità che una certa grandezza si discosti dal suo valore atteso diventa sempre più piccola.


La dimostrazione della legge dei grandi numeri debole utilizza l'ineguaglianza di Chebyshev per mostrare che la deviazione della media campionaria dalla media attesa diminuisce al crescere del numero di prove. Questo implica che la probabilità che la media campionaria si discosti dalla media attesa diventa sempre più piccola all'aumentare delle prove.


definizioni

•  Mn è la media campionaria di un insieme di variabili casuali indipendenti e identicamente distribuite.

Siano  X1, X2, ... ,Xn variabili casuali indipendenti e identicamente distribuite con media . La media campionaria  Mn delle prime n variabili casuali è definita come:

Mn =1ni=1nXi

L'obiettivo è dimostrare che, all'aumentare di n, la media campionaria  Mnconverge alla media attesa  in probabilità


L'ineguaglianza di Chebyshev afferma che per qualsiasi variabile casuale con varianza finita, la probabilità che la variabile si discosti dalla sua media di più di un certo valore è limitata. 


per a >0:
P( | X -  | >= a ) <= 2a2 

dove X è la variabile casuale,   è la media e 2 è la varianza.



Ora, consideriamo la deviazione della media campionaria Mndalla media attesa :

|Mn - | =|1ni=1nXi-| 

|Mn - | =|1ni=1n(Xi-)| 


Applicando l'ineguaglianza di Chebyshev:

|Mn - | <=1ni=1n|Xi-| 



Utilizzando l'ineguaglianza di Chebyshev su ciascun termine:

|Mn - | <=1ni=1n 2a2 


dove a>=0 è un valore arbitrario.


|Mn - | <=n2na2

|Mn - | <=2a2 





dato un >0 e a=, otteniamo:


P( |Mn - |>= ) <=2(a)2=2()2=222=2 

Pertanto, per ogni >0, la probabilità che |Mn - |> tende a zero al crescere di n. 

Questo dimostra la convergenza in probabilità della media campionaria Mn  alla media attesa  secondo la legge dei grandi numeri debole.



Conclusioni

In definitiva, la legge dei grandi numeri è un concetto fondamentale nella teoria della probabilità e della statistica, fornendo una base solida per comprendere il comportamento delle medie nei processi casuali e la loro convergenza ai valori attesi. La differenza tra la versione debole e forte sta nella certezza della convergenza: la prima afferma la convergenza in probabilità, mentre la seconda asserisce la convergenza quasi certamente.
