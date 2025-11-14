import React, { useEffect } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import './MessagingChannelList.css';
import { SkeletonLoader } from './SkeletonLoader';

import { CreateChannelIcon, MoonIcon, SunIcon } from '../../assets';
import streamLogo from '../../assets/stream.png';

const MessagingChannelList = ({ children, error = false, loading, onCreateChannel, theme = 'dark', toggleTheme }) => {
  const { client, setActiveChannel } = useChatContext();
  const { id, image = streamLogo, name = 'Example User' } = client.user || {};

  useEffect(() => {
    const getDemoChannel = async (client) => {
      const channel = client.channel('messaging', 'first', { name: 'Demo Team Green', demo: 'social' });
      await channel.watch();
      await channel.addMembers([client.user.id]);
      setActiveChannel(channel);
    };

    if (!loading && !children?.props?.children?.length) {
      getDemoChannel(client);
    }
  }, [loading]); // eslint-disable-line

  // Update existing "Social Demo" channel to "Demo Team Green"
  useEffect(() => {
    const updateChannelName = async () => {
      try {
        const channel = client.channel('messaging', 'first');
        await channel.watch();
        
        if (channel.data.name === 'Social Demo') {
          await channel.update(
            { name: 'Demo Team Green' },
            { text: 'Channel name updated to Demo Team Green' }
          );
        }
      } catch (error) {
        console.log('Channel update error:', error);
      }
    };

    if (client && !loading) {
      updateChannelName();
    }
  }, [client, loading]); // eslint-disable-line

  const ListHeaderWrapper = ({ children }) => {
    return (
      <div className='messaging__channel-list'>
        <div className='messaging__channel-list__header'>
          <Avatar image={image} name={name} size={40} />
          <div className='messaging__channel-list__header__name'>{name || id}</div>
          <button 
            className='messaging__channel-list__header__theme-toggle' 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className='messaging__channel-list__header__button' onClick={onCreateChannel}>
            <CreateChannelIcon />
          </button>
        </div>
        {children}
      </div>
    );
  };

  if (error) {
    return (
      <ListHeaderWrapper>
        <div className='messaging__channel-list__message'>
          Error loading conversations, please try again momentarily.
        </div>
      </ListHeaderWrapper>
    );
  }

  if (loading) {
    return (
      <ListHeaderWrapper>
        <div className='messaging__channel-list__message'>
          <SkeletonLoader />
        </div>
      </ListHeaderWrapper>
    );
  }

  return <ListHeaderWrapper>{children}</ListHeaderWrapper>;
};

export default React.memo(MessagingChannelList);
