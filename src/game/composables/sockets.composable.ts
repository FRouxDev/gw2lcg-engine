import { Socket, io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const SOCKETS_SERVICE_URL = 'http://localhost:3000';

export function useSockets() {
  const socket = ref<Socket>();

  onMounted(() => {
    socket.value = io(SOCKETS_SERVICE_URL);
  });
}
