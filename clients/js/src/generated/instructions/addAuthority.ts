/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type AddAuthorityInstructionAccounts = {
  /** The account to store the metadata's metadata in. */
  metadataAccount: PublicKey | Pda;
  /** The account that will pay for the transaction and rent. */
  payer?: Signer;
  /** The authority of the inscription account. */
  authority?: Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
};

// Data.
export type AddAuthorityInstructionData = {
  discriminator: number;
  newAuthority: PublicKey;
};

export type AddAuthorityInstructionDataArgs = { newAuthority: PublicKey };

export function getAddAuthorityInstructionDataSerializer(): Serializer<
  AddAuthorityInstructionDataArgs,
  AddAuthorityInstructionData
> {
  return mapSerializer<
    AddAuthorityInstructionDataArgs,
    any,
    AddAuthorityInstructionData
  >(
    struct<AddAuthorityInstructionData>(
      [
        ['discriminator', u8()],
        ['newAuthority', publicKeySerializer()],
      ],
      { description: 'AddAuthorityInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 5 })
  ) as Serializer<AddAuthorityInstructionDataArgs, AddAuthorityInstructionData>;
}

// Args.
export type AddAuthorityInstructionArgs = AddAuthorityInstructionDataArgs;

// Instruction.
export function addAuthority(
  context: Pick<Context, 'payer' | 'programs'>,
  input: AddAuthorityInstructionAccounts & AddAuthorityInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplInscription',
    '1NSCRfGeyo7wPUazGbaPBUsTM49e1k2aXewHGARfzSo'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    metadataAccount: {
      index: 0,
      isWritable: true,
      value: input.metadataAccount ?? null,
    },
    payer: { index: 1, isWritable: true, value: input.payer ?? null },
    authority: { index: 2, isWritable: false, value: input.authority ?? null },
    systemProgram: {
      index: 3,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: AddAuthorityInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getAddAuthorityInstructionDataSerializer().serialize(
    resolvedArgs as AddAuthorityInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
