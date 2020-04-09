
exports.MESSAGE_INIT = {
  init: 'Hey I need this id',
  history: ''
  + '```\n'
  + 'Historique du titre de Grand Maître de la branche :\n'
  + '\n'
  + '+ 2020/03/28 Viky création du titre\n'
  + '+ 2020/04/06 Lawliet par victoire\n'
  + '+ 2020/03/28 Viky création du titre\n'
  + '+ 2020/04/07 Kakugen par victoire\n'
  + '+ 2020/04/07 Bad par victoire\n'
  + '```',
  challenger: ''
  + '```\n'
  + 'Liste des challenger:\n'
  + '\n'
  + '```',
  victory_high_score: ''
  + '```\n'
  + 'Classement des Grands Maîtres par nombre de victoire et par reigne:\n'
  + '\n'
  + '```',
};
exports.COMMANDS_PHRASES = {
  challenge_phrase: 'Je defie le tenant du titre de Grand Maitre',
  resign_phrase: 'Par peur, j\'abandonne mon defi devant le o combien Grand Maitre',
  dreadnought_win_phrase: 'Je concerve mon titre de grand maitre',
  dreadnought_lose_phrase: 'Je suis votre nouveau maitre gloire a moi'
};
exports.RETURN_MESSAGE = {
  add_challenge_list: 'Tu as ete ajoute a la liste des challengers',
  already_in_challenge_list: 'Tu es deja dans la liste des challengeurs va te battre plutot',
  dreadnought_lose: 'Un nouveau maitre est dans la place',
  dreadnought_lose_try_annouced: 'On a un peu de pitier, ce n est pas a toi d annoncer ta defaite',
  dreadnought_try_challenge: 'Tu es deja le Maitre, tu vas pas en plus etre le challenger',
  dreadnought_win: 'Qui vaincra le grand maitre ?',
  dreadnought_win_but_against_who: 'Merci de me prevenir que tu as gagner, mais contre qui ?',
  not_be_challenger: 'Tu n\'etais pas challenger, tu crois me tricker oh !',
  not_be_dreadnought: 'Tu n es pas le grand maitre tu n as pas le droit a cette commande',
  not_in_challenger_list: 'il ne t a pas defie, tu as beau etre grand maitre, tu m auras pas !',
  not_dreadnought_not_allowed: 'Tu n es pas le grand maitre tu n as pas le droit a cette commande',
  remove_challenge_list: 'Tu as ete retire de la liste des challengers',
  wrong_pwd_to_set: 'Mauvais mot de passe, es-tu sur d\'avoir les droits pour faire ca ?',
};
exports.HISTORY_MESSAGE = {
  dreadnought_lose: 'un nouveau reigne commence',
  dreadnought_win: 'et concerve son titre',
};