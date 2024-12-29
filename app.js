const getNumberFact = async (number) => {
  const res = await fetch(`http://numbersapi.com/${number}?json`);
  try {
    const { text } = JSON.parse(await res.text());
    return text;
  } catch (error) {
    console.log("Error parsing JSON");
  }
};

const numberFactMain = () => {
  try {
    getNumberFact(69).then((res) => console.log("showNumberTrivia: " + res));

    Promise.race([
      getNumberFact(22).then((res) => res),
      getNumberFact(25).then((res) => res),
      getNumberFact(23).then((res) => res),
      getNumberFact(19).then((res) => res),
    ]).then((winner) => console.log("showNumberRace: " + winner));

    Promise.all([
      getNumberFact(220).then((res) => res),
      getNumberFact("IBRAHEM").then((res) => res),
      getNumberFact(230).then((res) => res),
      getNumberFact(190).then((res) => res),
    ]).then((allWon) => console.log(allWon));
  } catch (e) {
    console.log(e);
  }
};

// numberFactMain();

const getDeckOfCards = async (number) => {
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/new/shuffle?json`
    );
    const { _success, deck_id, _remaining, _shuffled } = await res.json();
    const getCard = await fetch(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw`
    );
    const response = await getCard.json();
    return response.cards[0].image;
  } catch (error) {
    console.log("Error parsing JSON");
  }
};

const deckOfCardsMain = async () => {
  try {
    getDeckOfCards(1);
  } catch (e) {
    console.log(e);
  }
};

deckOfCardsMain();
