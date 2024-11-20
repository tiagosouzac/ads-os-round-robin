import { createInterface } from "node:readline";

function input(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      answer = answer.trim();
      answer = answer === "" ? undefined : answer;
      resolve(answer);
      rl.close();
    });
  });
}

export { input };
