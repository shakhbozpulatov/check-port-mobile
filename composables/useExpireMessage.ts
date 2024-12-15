export const useCalcExpireTime = () => {
  let intervalId = null

  const calcExpire = (time: number) => {
    intervalId = setInterval(() => {
      time--
      if (time === 300) {
        // ElNotification.warning({
        //   title: 'Warning',
        //   message: "Narxlar 5 minutdan keyin o'zgarishi mumkin",
        //   type: 'warning',
        //   duration: 5000,
        // })
      }
      if (time <= 60) {
        clearInterval(intervalId)
      }
    }, 1000)
  }
  return { calcExpire }
}
