function sortProcessesByArrivalTime(processes) {
  return processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
}

function enqueueArrivedProcesses(processes, elapsedTime, queue) {
  processes
    .filter((process) => process.arrivalTime === elapsedTime)
    .forEach((process) => queue.push(process));
}

function printProcess(runningProcess) {
  console.log(`Processo: ${runningProcess.name}`);
  console.log(`Duração: ${runningProcess.duration}`);
  console.log(`Tempo de chegada: ${runningProcess.arrivalTime}`);
  console.log();
}

function printQueue([runningProcess, ...queue] = []) {
  if (!runningProcess && queue.length === 0) {
    console.log("Nenhum processo na fila.");
    return;
  }

  console.group("Fila de processos:");

  if (runningProcess) {
    console.group("Processo em execução:");
    printProcess(runningProcess);
    console.groupEnd();
  }

  if (queue.length > 0) {
    console.group("Processos prontos:");
    queue.forEach(printProcess);
    console.groupEnd();
  }

  console.groupEnd();
}

function isRunningProcessFinished(runningProcess) {
  return runningProcess.duration === 0;
}

function isQuantumExpired(remainingQuantum) {
  return remainingQuantum === 0;
}

function roundRobin(processes = [], quantum) {
  processes = sortProcessesByArrivalTime(processes);

  let elapsedTime = 0,
    remainingQuantum = quantum,
    queue = [];

  console.clear();

  while (processes.length > 0) {
    enqueueArrivedProcesses(processes, elapsedTime, queue);

    const runningProcess = queue[0];

    console.group(
      `Tempo atual: ${elapsedTime} - Quantum restante: ${remainingQuantum}`
    );

    printQueue(queue);

    if (runningProcess) {
      reduceProcessDuration(runningProcess);

      if (isRunningProcessFinished(runningProcess)) {
        finishProcess(runningProcess);
      }

      if (isQuantumExpired(remainingQuantum)) {
        moveToNextProcess();
      }
    }

    console.groupEnd();

    elapsedTime++;
    console.log();
  }

  console.log("Todos os processos foram finalizados!");

  function reduceProcessDuration(runningProcess) {
    runningProcess.duration--;
    remainingQuantum--;
  }

  function finishProcess(runningProcess) {
    queue.shift();
    processes.shift();
    remainingQuantum = quantum;
    console.log(`Processo ${runningProcess.name} finalizado!`);
  }

  function moveToNextProcess() {
    const runningProcess = queue.shift();
    queue.push(runningProcess);
    remainingQuantum = quantum;
    console.log(`Quantum expirado! Movendo para o próximo processo.`);
  }
}

export { roundRobin };
