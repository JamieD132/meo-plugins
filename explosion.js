const explosion = "https://raw.githubusercontent.com/3r1s-s/meo-plugins/main/assets/explosion/snd_badexplosion.wav"
function explode() {
	new Audio(explosion).play()
}

const actuallydeletepost = deletePost
deletePost = function() {
	explode();
	actuallydeletepost(...arguments)
}

const actuallyclosechat = closeChat
closeChat = function() {
	explode();
	actuallyclosechat(...arguments)
}

const actuallyRemoveEmoji = removeEmoji
removeEmoji = function() {
	explode();
	actuallyRemoveEmoji(...arguments)
}

const actuallyremovememberfromgc = removeMemberFromGC
removeMemberFromGC = function() {
	explode();
	actuallyremovememberfromgc(...arguments)
}

// lmao
const actuallydeleteaccount = deleteAccount
deleteAccount = function () {
	explode();
	actuallydeleteaccount(...arguments)
}
