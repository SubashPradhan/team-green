import avatar1 from './userImages/user-01.jpeg';
import avatar2 from './userImages/user-02.jpeg';
import avatar3 from './userImages/user-03.jpeg';
import avatar4 from './userImages/user-04.jpeg';
import avatar5 from './userImages/user-05.jpeg';
import avatar6 from './userImages/user-06.jpeg';
import avatar7 from './userImages/user-07.jpeg';
import avatar8 from './userImages/user-08.jpeg';
import avatar9 from './userImages/user-09.jpeg';
import avatar10 from './userImages/user-10.jpeg';
import avatar11 from './userImages/user-11.jpeg';
import avatar12 from './userImages/user-12.jpeg';
import avatar13 from './userImages/user-13.jpeg';
import avatar14 from './userImages/user-14.jpeg';
import avatar15 from './userImages/user-15.jpeg';
import avatar16 from './userImages/user-16.jpeg';
import avatar17 from './userImages/user-17.jpeg';
import avatar18 from './userImages/user-18.jpeg';
import avatar19 from './userImages/user-19.jpeg';
import avatar20 from './userImages/user-20.jpeg';

export { ChannelInfoIcon } from './ChannelInfoIcon';
export { ChannelSaveIcon } from './ChannelSaveIcon';
export { CloseThreadIcon } from './CloseThreadIcon';
export { CommandIcon } from './CommandIcon';
export { CreateChannelIcon } from './CreateChannelIcon';
export { EmojiIcon } from './EmojiIcon';
export { HamburgerIcon } from './HamburgerIcon';
export { LightningBoltSmall } from './LightningBoltSmall';
export { MoonIcon } from './MoonIcon';
export { SendIcon } from './SendIcon';
export { SunIcon } from './SunIcon';
export { XButton } from './XButton';
export { XButtonBackground } from './XButtonBackground';

const randomImages = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
];

export const getRandomImage = () => {
  const index = Math.floor(Math.random() * 20);
  return randomImages[index];
};

// Generate a consistent hash from a string (for deterministic avatar assignment)
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Get a deterministic image based on a string (channel name, user ID, etc.)
export const getDeterministicImage = (identifier) => {
  if (!identifier) identifier = 'default';
  const index = hashString(identifier) % 20;
  return randomImages[index];
};

export const getCleanImage = (member) => {
  const userImage = member.user?.image;
  
  // Debug logging
  if (member.user?.id === 'testUser' || member.user?.name?.includes('Test')) {
    console.log('DEBUG testUser:', {
      userId: member.user?.id,
      userName: member.user?.name,
      userImage: userImage,
      willReturn: userImage && typeof userImage === 'string' && userImage.trim() !== '' ? userImage : 'fallback'
    });
  }
  
  // If user has an image, return it directly - let the Avatar component handle it
  if (userImage && typeof userImage === 'string' && userImage.trim() !== '') {
    return userImage;
  }
  
  // Special assignments for specific users
  if (member.user?.name === 'Jen Alexander') {
    return randomImages[11];
  }

  if (member.user?.name === 'Kevin Rosen') {
    return randomImages[19];
  }

  // Fallback: assign a deterministic random image based on user ID
  const userId = member.user?.id || member.user?.name || 'default';
  const index = hashString(userId) % 20;
  return randomImages[index];
};
