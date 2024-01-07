export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/mocks/fileMock.js',
        "\\.(css|less|scss|sass)$": "<rootDir>/src/test/mocks/styleMock.js",
    },
}