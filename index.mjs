import {
  askForProcessCount,
  askForQuantum,
  createProcesses,
} from "./questions.mjs";
import { roundRobin } from "./round-robin.mjs";

async function main() {
  const processCount = await askForProcessCount();
  const processes = await createProcesses(processCount);
  const quantum = await askForQuantum();

  roundRobin(processes, quantum);
}

main();
