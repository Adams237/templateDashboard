import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`
            ${sizes[size]}
            rounded-full
            bg-gray-200
            flex
            items-center
            justify-center
            text-gray-600
            font-medium
          `}
        >
          {getInitials(alt)}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute
            bottom-0
            right-0
            block
            h-3
            w-3
            rounded-full
            ring-2
            ring-white
            ${statusColors[status]}
          `}
        />
      )}
    </div>
  );
};

export default Avatar;

export const AvatarGroup: React.FC<{
  avatars: Array<{ src?: string; alt: string }>;
  max?: number;
  size?: AvatarProps['size'];
}> = ({ avatars, max = 3, size = 'md' }) => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
        />
      ))}
      {remaining > 0 && (
        <div
          className={`
            ${size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'}
            rounded-full
            bg-gray-200
            flex
            items-center
            justify-center
            text-sm
            font-medium
            text-gray-600
            ring-2
            ring-white
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};