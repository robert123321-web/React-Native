import react ,  {Component }from "react";
import data from "../data/countries.json";



class CountriesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
        };
    }

    componentDidMount() {

        this.setState({
             countries: data.countries
             });
        }

        renderItem = ({ item }) => {
            const { name, capital, description } = item;

            return (
                <View>
                    <Text>
                        City Name :{name}
                        </Text>
                    <Text>
                        Country Name :{name}
                        </Text>
                    <Text>
                        {description}
                        </Text>
                </View>
            );
        }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.countries}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }

}


export default CountriesScreen;
            