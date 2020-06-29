export const getAlerts = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          type: 'reset2fa',
          accountName: 'edgy41'
        },
        {
          type: 'loginRequest',
          accountName: 'edgy42'
        }
      ])
    }, 500)
  })
