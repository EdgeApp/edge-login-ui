export const getAlerts = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          type: 'reset2fa',
          accountName: 'joeSmith'
        },
        {
          type: 'loginRequest',
          accountName: 'smithJoe'
        }
      ])
    }, 500)
  })
