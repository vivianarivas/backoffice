export async function getMenuData() {
  return [

    {
      title: 'BMR',
      key: 'Censys',
      icon: 'fe fe-database',
      children: [
        {
          title: 'Clientes',
          key: 'appsClients',
          url: '/bmr/clients',
        }

      ]
    },
    {
      title: 'Notificaciones',
      key: 'notification',
      icon: 'fe fe-bell',
      url: '/bmr/notification'
    },
    {
      title: 'Chat',
      key: 'chat',
      icon: 'fe fe-message-square',
      url: '/bmr/chat'
    },
    {
      title:'Simulacion',
      key: 'simulacion',
      icon: 'fe fe-grid',
      url: '/bmr/simulation'
    },
    {
      title: 'Test',
      key: 'test',
      icon: 'fe fe-message-square',
      url: '/bmr/test'
    },
    {
      title: 'Dashboard',
      key: 'Dashboard',
      icon: 'fe fe-message-square',
      url: '/bmr/dashboard'
    }
  ]
}
