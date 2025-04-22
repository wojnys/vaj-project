import { Badge, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const JokeCard = () => {
    const joke = useSelector((state: RootState) => state.joke);

    return (
        <Card className="flex justify-center w-full flex-col items-start p-4">
            <div className="">
                <CardMedia sx={{ height: 50, width: 50 }} image={"https://api.chucknorris.io/img/avatar/chuck-norris.png"} title="green iguana" />
            </div>

            <CardContent className="w-full text-left">
                <Badge badgeContent={joke.joke.title} color={"primary"} className="pr-3"></Badge>
                <Typography gutterBottom variant="h5" component="div" className="text-left">
                    {joke.joke.category}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {joke.joke.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default JokeCard;
