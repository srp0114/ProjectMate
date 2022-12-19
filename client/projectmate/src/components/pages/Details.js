import React, { useState }from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import data from '../data.js';
import '../style/Shop.css'

const Card = () => {
    const [cards, setCards] = useState(data);

    return (
        <>
        <div className="Item">
            {cards.map((card, i) => {
                return (
                    <Card className="Card">
                    <CardMedia
                        component="img"
                        image={card.image}
                    />
                    <CardContent>
                        <p>{card.title}</p>
                        <p>{card.change}</p>
                        <p>{card.address}</p>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                    </Card>

                )
            })}
      </div>
      </>
    )
}

export default Card;