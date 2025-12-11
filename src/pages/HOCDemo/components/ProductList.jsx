import withLoading from "@/hoc/withLoading";

function ProductList() {
    const products = ["Laptop", "Điện thoại", "Máy tính bảng"];

    return (
        <ul>
            {products.map((product, index) => (
                <li key={index}>{product}</li>
            ))}
        </ul>
    );
}

export default withLoading(ProductList);
