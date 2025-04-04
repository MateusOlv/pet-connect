import{ render } from "@testing-library/react-native";
import { ProductCard } from "../ProductCard";  

describe("ProductCard", () =>{
    test("the component rendered", () => {
        render(
            <ProductCard 
                title="Ração Premium" 
                rating={4.9} 
                distance="190m" 
                price="RS143,90" 
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/e99b7319c323cb349d674b033495dc64c6202b83" 
            />
        );
    })
})
