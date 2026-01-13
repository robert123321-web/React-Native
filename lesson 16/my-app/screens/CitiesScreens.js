import React from 'react';


class CitiesScreens extends Comment {
    constructor(props) {
        super(props);
        this.state = {
            cities: []
        };
    }

    componentDidMount() {
        this.setState({ cities: data })
    }
    renderItem = ({ item }) => {
        const{name, countryCode, population, description} = item;
        return (
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{countryCode}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.small}>{name}</Text>
                
            </View>
        )
    };
    render(){
        return (
            <View style={styles.screenTitle}>

                <Flatlist data={this.state.cities}>
                    data={this.state.cities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                </Flatlist>
            </View>
        )
    }

}

export default CitiesScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
},
screenTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
},
cardWrapper: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
},title: {
        fontSize: 16,
        fontWeight: 'bold',

},
subtitle: {
        fontSize: 14,
        color: '#666',
)