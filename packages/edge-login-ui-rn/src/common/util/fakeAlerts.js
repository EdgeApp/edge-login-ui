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

export const getAlert = async (username: string) => {
  const alerts = await getAlerts()
  const alert = alerts.find(alert => alert.accountName === username)
  if (!alert) return null
  if (alert.accountName === 'edgy41') {
    return {
      ...alert,
      device: 'iPhone XS, iOS 13.3.1',
      lastLocation: 'San Diego, California, United States',
      lastDate: 'Thursday, December 19, 2019, 12:01 AM PST',
      disbaledDate: 'Tuesday, December 31, 2019, 3:00 PM PST'
    }
  }
  if (alert.accountName === 'edgy42') {
    return {
      ...alert,
      device: 'iPhone 11, iOS 13.5.1',
      lastLocation: 'San Diego, California, United States',
      lastDate: 'Thursday, December 19, 2020, 12:01 AM PST',
      disbaledDate: 'Tuesday, December 31, 2020, 5:00 PM PST'
    }
  }
}
