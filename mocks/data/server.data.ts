import { Server } from 'src/stores/server-store'

function generateServerList(serverCount: number) {
  const serverMap: Record<string, Server> = {}

  for (let i = 1; i <= serverCount; i++) {
    const server: Server = {
      id: `server-${i}`,
      name: `Dummy server ${i}`,
      iconUrl: '/api/dummy-avatar',
    }

    serverMap[server.id] = server
  }
  return serverMap
}

export const servers: Record<string, Server> = generateServerList(10)
