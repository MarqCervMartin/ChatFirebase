import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance(
  'd5386b79-fd5a-4fe6-a6b3-7f0ba39a07ce'
);

export function getChannelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
}
