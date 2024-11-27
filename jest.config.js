/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Corrige o ambiente para testes com React
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy", // Ignora arquivos CSS nos testes
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Arquivo de configuração adicional
};
