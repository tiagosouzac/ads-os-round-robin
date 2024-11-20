# Round-Robin

O algoritmo Round-Robin é uma forma de organizar a execução de processos em sistemas operacionais, especialmente em ambientes onde o tempo de CPU é compartilhado entre várias tarefas. Ele divide o tempo de uso da CPU igualmente entre todos os processos, atribuindo a cada um um tempo fixo para rodar, conhecido como "quantum". Quando esse tempo se esgota, o processo é colocado no final da fila, caso ainda não tenha terminado sua execução, e o próximo processo da fila recebe a CPU. Esse ciclo continua até que todos os processos sejam concluídos. O Round-Robin é simples e eficaz, garantindo que nenhum processo monopolize a CPU e permitindo que todos tenham chances iguais de execução.

## Como Executar o Programa

Certifique-se de ter o Node.js instalado na sua máquina. Depois, basta usar o comando `node index.mjs` no terminal.

## Implementação

### Entrada de Dados

O programa começa solicitando informações do usuário para configurar os processos e o valor do **quantum**:

1. **Número de processos:** O usuário é solicitado a inserir entre 1 e 15 processos.
   ```js
   const processCount = await askForProcessCount();
   ```
2. **Detalhes de cada processo:** Para cada processo, o programa pergunta:
   - Nome do processo.
   - Duração total (em unidades de tempo).
   - Tempo de chegada.
   ```js
   const processes = await createProcesses(processCount);
   ```
3. **Quantum:** O quantum é o tempo máximo que cada processo pode ser executado antes de ceder o controle para o próximo.
   ```js
   const quantum = await askForQuantum();
   ```

---

### Ordenação dos Processos

Os processos são organizados por ordem crescente de **tempo de chegada**, garantindo que os processos mais antigos tenham prioridade para entrar na fila de execução.

```js
processes = sortProcessesByArrivalTime(processes);
```

---

### Execução do Round-Robin

O algoritmo é executado em ciclos até que todos os processos sejam concluídos. A cada unidade de tempo:

1. **Adição de novos processos à fila:**
   O programa verifica se há processos que chegaram no tempo atual e os adiciona à fila.

   ```js
   enqueueArrivedProcesses(processes, elapsedTime, queue);
   ```

2. **Execução do processo atual:**

   - O processo no início da fila é executado.
   - Sua duração é reduzida em 1 unidade de tempo.
   - O quantum restante também é reduzido.

   ```js
   reduceProcessDuration(runningProcess);
   ```

3. **Condições para manipular o processo atual:**
   - Se o processo terminar sua duração total:
     - Ele é removido da fila e da lista de processos.
     - O quantum é reiniciado.
     ```js
     if (isRunningProcessFinished(runningProcess)) {
       finishProcess(runningProcess);
     }
     ```
   - Se o quantum expirar antes do término do processo:
     - O processo é movido para o final da fila.
     - O quantum é reiniciado.
     ```js
     if (isQuantumExpired(remainingQuantum)) {
       moveToNextProcess();
     }
     ```

---

### Saída e Logs

A cada ciclo, o programa exibe o estado atual do sistema para o usuário:

- **Tempo atual e quantum restante:**
  ```js
  printElapsedTimeAndQuantum(elapsedTime, remainingQuantum);
  ```
- **Fila de processos:** Mostra os processos em espera, com detalhes como nome, duração restante e tempo de chegada.
  ```js
  printQueue(queue);
  ```
- **Processo em execução:** Exibe o processo atualmente sendo executado e suas informações.
  ```js
  printRunningProcess(runningProcess);
  ```

Quando todos os processos são concluídos, uma mensagem final é exibida:

```js
console.log("Todos os processos foram finalizados!");
```

---

### Código em Ação

Exemplo de interação:

```
Quantos processos deseja criar? Mínimo: 1, Máximo: 15
> 3

Processo 1
Nome do processo: P1
Duração do processo: 5
Tempo de chegada do processo: 0

Processo 2
Nome do processo: P2
Duração do processo: 3
Tempo de chegada do processo: 1

Processo 3
Nome do processo: P3
Duração do processo: 4
Tempo de chegada do processo: 2

Digite o valor do quantum:
> 2

Tempo atual: 0 - Quantum restante: 2
  Fila de processos:
    Processo em execução:
      Processo: P1
      Duração: 5
      Tempo de chegada: 0

Tempo atual: 1 - Quantum restante: 1
  Fila de processos:
    Processo em execução:
      Processo: P1
      Duração: 4
      Tempo de chegada: 0

    Processos prontos:
      Processo: P2
      Duração: 3
      Tempo de chegada: 1

  Quantum expirado! Movendo para o próximo processo.

Tempo atual: 2 - Quantum restante: 2
  Fila de processos:
    Processo em execução:
      Processo: P2
      Duração: 3
      Tempo de chegada: 1

    Processos prontos:
      Processo: P1
      Duração: 3
      Tempo de chegada: 0

      Processo: P3
      Duração: 4
      Tempo de chegada: 2


Tempo atual: 3 - Quantum restante: 1
  Fila de processos:
    Processo em execução:
      Processo: P2
      Duração: 2
      Tempo de chegada: 1

    Processos prontos:
      Processo: P1
      Duração: 3
      Tempo de chegada: 0

      Processo: P3
      Duração: 4
      Tempo de chegada: 2

  Quantum expirado! Movendo para o próximo processo.

Tempo atual: 4 - Quantum restante: 2
  Fila de processos:
    Processo em execução:
      Processo: P1
      Duração: 3
      Tempo de chegada: 0

    Processos prontos:
      Processo: P3
      Duração: 4
      Tempo de chegada: 2

      Processo: P2
      Duração: 1
      Tempo de chegada: 1


Tempo atual: 5 - Quantum restante: 1
  Fila de processos:
    Processo em execução:
      Processo: P1
      Duração: 2
      Tempo de chegada: 0

    Processos prontos:
      Processo: P3
      Duração: 4
      Tempo de chegada: 2

      Processo: P2
      Duração: 1
      Tempo de chegada: 1

  Quantum expirado! Movendo para o próximo processo.

Tempo atual: 6 - Quantum restante: 2
  Fila de processos:
    Processo em execução:
      Processo: P3
      Duração: 4
      Tempo de chegada: 2

    Processos prontos:
      Processo: P2
      Duração: 1
      Tempo de chegada: 1

      Processo: P1
      Duração: 1
      Tempo de chegada: 0


Tempo atual: 7 - Quantum restante: 1
  Fila de processos:
    Processo em execução:
      Processo: P3
      Duração: 3
      Tempo de chegada: 2

    Processos prontos:
      Processo: P2
      Duração: 1
      Tempo de chegada: 1

      Processo: P1
      Duração: 1
      Tempo de chegada: 0

  Quantum expirado! Movendo para o próximo processo.

Tempo atual: 8 - Quantum restante: 2
  Fila de processos:
    Processo em execução:
      Processo: P2
      Duração: 1
      Tempo de chegada: 1

    Processos prontos:
      Processo: P1
      Duração: 1
      Tempo de chegada: 0

      Processo: P3
      Duração: 2
      Tempo de chegada: 2

  Processo P2 finalizado!

Tempo atual: 9 - Quantum restante: 2
  Fila de processos:
    Processo em execução:
      Processo: P1
      Duração: 1
      Tempo de chegada: 0

    Processos prontos:
      Processo: P3
      Duração: 2
      Tempo de chegada: 2

  Processo P1 finalizado!

Tempo atual: 10 - Quantum restante: 2
  Fila de processos:
    Processo em execução:
      Processo: P3
      Duração: 2
      Tempo de chegada: 2

Tempo atual: 11 - Quantum restante: 1
  Fila de processos:
    Processo em execução:
      Processo: P3
      Duração: 1
      Tempo de chegada: 2

  Processo P3 finalizado!

Todos os processos foram finalizados!
```

Este ciclo continua até que todos os processos sejam concluídos.
