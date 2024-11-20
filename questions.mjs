import { input } from "./utils.mjs";

function isValidProcessCount(processCount) {
  return !isNaN(processCount) && processCount >= 1 && processCount <= 15;
}

async function askForProcessCount() {
  let processCount = 0;

  console.clear();

  while (!isValidProcessCount(processCount)) {
    processCount = Number(
      await input("Quantos processos deseja criar? Mínimo: 1, Máximo: 15\n")
    );

    if (!isValidProcessCount(processCount)) {
      console.log("Quantidade inválida! Digite novamente.");
    }
  }

  return processCount;
}

function isValidProcessName(name = "") {
  return name.length > 0;
}

async function askForProcessName() {
  let name;

  while (!isValidProcessName(name)) {
    name = await input("Nome do processo: ");

    if (!isValidProcessName(name)) {
      console.log("Nome inválido! Digite novamente.");
    }
  }

  return name;
}

function isValidProcessDuration(duration) {
  return !isNaN(duration) && duration > 0;
}

async function askForProcessDuration() {
  let duration;

  while (!isValidProcessDuration(duration)) {
    duration = Number(await input("Duração do processo: "));

    if (!isValidProcessDuration(duration)) {
      console.log("Duração inválida! Digite novamente.");
    }
  }

  return duration;
}

function isValidArrivalTime(arrivalTime) {
  return !isNaN(arrivalTime) && arrivalTime >= 0;
}

async function askForProcessArrivalTime() {
  let arrivalTime;

  while (!isValidArrivalTime(arrivalTime)) {
    arrivalTime = Number(await input("Tempo de chegada do processo: "));

    if (!isValidArrivalTime(arrivalTime)) {
      console.log("Tempo de chegada inválido! Digite novamente.");
    }
  }

  return arrivalTime;
}

async function askForProcessDetails() {
  let name = await askForProcessName();
  let duration = await askForProcessDuration();
  let arrivalTime = await askForProcessArrivalTime();

  return { name, duration, arrivalTime };
}

async function createProcesses(processCount) {
  const processes = [];

  console.clear();

  for (let i = 0; i < processCount; i++) {
    console.log(`Processo ${i + 1}`);
    const process = await askForProcessDetails();
    processes.push(process);
    console.log();
  }

  return processes;
}

function isValidQuantum(quantum) {
  return !isNaN(quantum) && quantum > 0;
}

async function askForQuantum() {
  let quantum;

  while (!isValidQuantum(quantum)) {
    quantum = Number(await input("Digite o valor do quantum: "));

    if (!isValidQuantum(quantum)) {
      console.log("Quantum inválido! Digite novamente.");
    }
  }

  return quantum;
}

export { askForProcessCount, createProcesses, askForQuantum };
