import os from "os";

export const getEOL = () => {
  console.log(`EOL: ${JSON.stringify(os.EOL)}`);
};
export const getCPUs = () => {
  const cpus = os.cpus();
  console.log(`Total CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(
      `CPU ${index + 1}: Model - ${cpu.model}, Speed - ${(
        cpu.speed / 1000
      ).toFixed(2)} GHz`
    );
  });
};

export const getHomeDir = () => {
  console.log(`Home Directory: ${os.homedir()}`);
};

export const getUsername = () => {
  console.log(`Current System User: ${os.userInfo().username}`);
};

export const getArchitecture = () => {
  console.log(`CPU Architecture: ${os.arch()}`);
};
