export interface PeerContact {
  id: string;
  name: string;
  nickname: string;
  ip: string; // Primary permanent IP address for dialing!
  link?: string;
  lastSeen: number;
  country?: string;
  city?: string;
  org?: string;
  platform?: string;
  notes?: string;
  isFavorite?: boolean;
  mood?: string;
}

export interface NetworkInfo {
  publicIp: string;
  country?: string;
  countryCode?: string;
  city?: string;
  org?: string;
  localCandidates: string[];
  stunReflexiveIp?: string;
  connectionType?: string;
  online: boolean;
  isLoading: boolean;
}

export interface PeerNetworkInfo {
  publicIp?: string;
  country?: string;
  city?: string;
  org?: string;
  language?: string;
  timezone?: string;
  screen?: string;
  platform?: string;
  ips?: string[];
  lastPingMs?: number;
  avgPingMs?: number;
  mood?: string;
}

export interface VideoSyncMessage {
  type: 'video_sync';
  action: 'play' | 'pause' | 'seek' | 'speed' | 'load_url';
  currentTime: number;
  playbackRate?: number;
  url?: string;
  title?: string;
  timestamp: number;
}

export interface VideoReactionMessage {
  type: 'video_reaction';
  emoji: string;
  label?: string;
  senderName?: string;
  timestamp: number;
}

export interface FileTransferProgress {
  id: string;
  name: string;
  size: number;
  transferred: number;
  speedBps: number;
  progress: number; // 0 - 100
  direction: 'sending' | 'receiving';
  status: 'transferring' | 'completed' | 'cancelled' | 'error';
  url?: string;
  mime?: string;
}

export interface GroupParticipant {
  id: string;
  name: string;
  ip?: string;
  city?: string;
  isHost?: boolean;
  isMe?: boolean;
  joinedAt: number;
  mood?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'peer' | 'system';
  senderName?: string;
  senderId?: string;
  text: string;
  timestamp: number;
  isBridgeRelayed?: boolean;
  file?: {
    name: string;
    size: number;
    url: string;
    mime: string;
    isVideo?: boolean;
  };
}

export interface NearbyDevice {
  stationId: string;
  userName: string;
  clientIp: string;
  lastSeen: number;
}

export interface WhiteboardPoint {
  x: number; // Normalized 0.0 to 1.0
  y: number; // Normalized 0.0 to 1.0
}

export interface WhiteboardStroke {
  id: string;
  points: WhiteboardPoint[];
  color: string;
  width: number;
  isEraser?: boolean;
}

export interface WhiteboardDrawMessage {
  type: 'whiteboard_draw';
  stroke: WhiteboardStroke;
  senderId?: string;
  senderName?: string;
}

export interface WhiteboardClearMessage {
  type: 'whiteboard_clear';
  senderId?: string;
  senderName?: string;
}
