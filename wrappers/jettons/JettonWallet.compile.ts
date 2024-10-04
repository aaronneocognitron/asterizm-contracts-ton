import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    targets: ['contracts-fc/stdlib.fc','contracts-fc/params.fc','contracts-fc/op-codes.fc','contracts-fc/jetton-utils.fc','contracts-fc/jetton-wallet.fc'],
};
