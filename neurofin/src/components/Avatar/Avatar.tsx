import React from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';

interface AvatarProps {
  seed?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ seed = 'default' }) => {
  const svg = createAvatar(style, {
    seed: seed,
    backgroundColor: ['b6e3f4'],
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: '100%', height: '100%' }} />
  );
};