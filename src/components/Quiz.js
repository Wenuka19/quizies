import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'
import he from 'he'

export default function Quiz() {
    const [questions, setQuiz] = React.useState([])
    const [completed, setCompleted] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    //Fetch data from the API
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple").then(res => res.json()).then(data => {
            const items = data.results;
            //Add new items to each question object [ID, answer IDs, isSelected(bool)]
            const q_objects = items.map(
                q => {
                    let answerList = q.incorrect_answers.map(a => {
                        return (
                            {
                                text: he.decode(a),
                                isSelected: false,
                                id: nanoid()
                            }
                        )
                    })
                    answerList.push({
                        text: he.decode(q.correct_answer),
                        isSelected: false,
                        id: nanoid()
                    })
                    return (
                        {
                            ...q,
                            question: he.decode(q.question),
                            id: nanoid(),
                            answers: shuffle(answerList),
                            incorrect_answers: q.incorrect_answers.map(a => {
                                return (
                                    {
                                        text: he.decode(a),
                                        isSelected: false,
                                        id: nanoid()
                                    }
                                )
                            }),
                            correct_answer: {
                                text: he.decode(q.correct_answer),
                                isSelected: false,
                                id: nanoid()
                            }
                        }
                    )
                }
            )
            //Set state of question array
            // return (q_objects)
            setQuiz(q_objects);
            setNewGame(false);
        })
    }, [newGame])
    console.log(questions)
    function loadQuestions() {
        if (!completed && !newGame) {
            setCompleted(true);

        }

        else if (completed && !newGame) {
            setNewGame((prev) => !prev);
            setCompleted(false);
        }
    }



    //Make question components from the objects in the question array
    let questionComponents = questions.map(q => {
        return (
            <div key={nanoid()}>
                <Question key={q.id} obj={q} toSelect={toggleAnswer} checking={completed} />
                <hr />
            </div>
        )
    })
    function toggleAnswer(q_id, a_id) {
        if (!completed) {
            setQuiz(
                oldQuestions => {
                    return (
                        oldQuestions.map(
                            q => {
                                //Find the question id of the clicked answer
                                if (q.id === q_id) {
                                    //set the isSelected value to true of the selected answer
                                    return (
                                        {
                                            ...q,
                                            incorrect_answers: q.incorrect_answers.map(
                                                a => {
                                                    return (
                                                        {
                                                            ...a,
                                                            isSelected: a.id === a_id ? true : false
                                                        }
                                                    )
                                                }
                                            ),
                                            correct_answer: {
                                                ...q.correct_answer,
                                                isSelected: q.correct_answer.id === a_id ? true : false
                                            }

                                        }
                                    )
                                }
                                else {
                                    return q
                                }
                            }
                        )
                    )
                }
            )
        }
    }


    function countPoints() {
        let count = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].correct_answer.isSelected) {
                count++;
            }
        }
        window.points = count;
        return (window.points)

    }



    if (questions.length === 0) {
        return (
            //Display a loading text if the data is not fetched yet
            <div className="loading">Loading...</div>
        )
    }

    return (
        <div className='quiz'>
            {questionComponents}
            <div className="footer">
                {completed && <p>You got {countPoints()}/{questions.length} Correct</p>}
                <button onClick={loadQuestions}>{completed ? "Play Again" : "Check"}</button>
            </div>
        </div >
    )
}
