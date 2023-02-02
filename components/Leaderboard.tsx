import { useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import { IScore } from "../typings"

const Leaderboard = ({ scores }: { scores: IScore[] }) => {


    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, i) =>
                    (<tr key={i + 1}>
                        <th>{i + 1}</th>
                        <td>{score.username}</td>
                        <td>{score.score}</td>
                    </tr>)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard