import { BinaryToTextEncoding, createHash } from 'crypto';

export function generateDigest(
  data: Buffer | string,
  algorithm = 'sha1',
  encoding: BinaryToTextEncoding = 'hex',
): string {
  return createHash(algorithm).update(data).digest(encoding);
}

export function generateChecksum(data: string): number {
  const sha1Hash = generateDigest(data);
  const first8Characters = sha1Hash.substring(0, 8);
  return parseInt(first8Characters, 16);
}
