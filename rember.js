const actuallylogout = logout
logout = function(iskl){
	if (!iskl) {
		localStorage.removeItem("username")
		localStorage.removeItem("token")
	}
	actuallylogout(true)
}
