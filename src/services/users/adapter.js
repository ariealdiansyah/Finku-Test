export const AdapterAllUsers = (data) => {
  const dataList = data.map((x) => {
    return {
      id: x._id,
      active: x.active,
      mobileNumber: x.mobileNumber,
      email: x.email,
      countryCode: x.countryCode,
      name: `${x.firstNamex} ${x.lastName}`,
    }
  })

  return dataList;
}
