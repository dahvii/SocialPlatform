function getAge(dateString) {
    console.log("i calcAge")
    var today = new Date();
    var birthDate = new Date(dateString);
    var newAge = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        newAge--;
    }
    return newAge
}

export default getAge;