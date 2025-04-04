import React from "react";
import{ render } from "@testing-library/react-native";
import { ProductCard } from "../ProductCard";  

describe("ProductCard", () =>{
    test("the component rendered", () => {
        render(
            <ProductCard 
                title="Sample Product"
                rating={4.5}
                distance="2 km"
                price="$20"
                image="https://via.placeholder.com/150"
            />
        );
    })
})
