import {
  userTimeline, createStream,
} from './twitter';
import { start, tweetId, stop } from './botCommands';
import log from './log';

const validCommands = {
  userTimeline,
  tweetId,
  createStream,
  start,
  stop,
};

export default async (shard, { cmd, ...msg }) => {
  if (!cmd) {
    log('Master received non-command message:');
    log(msg);
    return;
  }
  const commandFunction = validCommands[cmd];
  if (!commandFunction) {
    log(`Can't dispatch unknwn command: ${cmd}`);
    return;
  }
  log(msg);
  const res = await commandFunction(msg);
  if (res) {
    shard.send({
      cmd, msg, res,
    });
  }
};
