import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert,TextInput,KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard, } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Tik ikonu için

const MasalGeneratePage = ({ route, navigation }) => {
    const [currentStep, setCurrentStep] = useState(1); // Aktif adım
    const [selectedCharacter, setSelectedCharacter] = useState(null); // Seçilen karakter

    const handleNextStep = () => {
        if (currentStep === 1 && !selectedCharacter) {
            Alert.alert('Hata', 'Bir karakter seçmeden devam edemezsin!');
            return;
        }
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            navigation.navigate('StoryResult', { theme, selectedCharacter });
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const characters = [
        { name: 'Asel', image: require('../assets/images/asel.png'), style: styles.characterImage },
        { name: 'Cesim', image: require('../assets/images/cesim.png'), style: styles.cesimImage },
        { name: 'Beyza', image: require('../assets/images/beyza.png'), style: styles.characterImage },
        { name: 'Tavşan', image: require('../assets/images/tavsan.png'), style: styles.rabbitImage },
    ];
    const theme = [
        { name: 'Keşif', image: require('../assets/images/kesif.png'), style: styles.characterImage },
        { name: 'Gizem', image: require('../assets/images/gizem.png'), style: styles.gizemImage },
        { name: 'Macera', image: require('../assets/images/macera.png'), style: styles.characterImage },
        { name: 'Dostluk', image: require('../assets/images/dostluk.png'), style: styles.rabbitImage },
    ]; 

    return (
    <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.stepContainer}>
                {/* İlk Step */}
                <View style={styles.stepWrapper}>
                    <View
                        style={[
                            styles.step,
                            currentStep >= 1 && styles.activeStep,
                            currentStep === 1 && styles.activeStepNumber,
                        ]}
                    >
                        {currentStep > 1 ? (
                            <Ionicons name="checkmark" size={24} color="#fff" />
                        ) : (
                            <Text style={currentStep === 1 ? styles.activeStepNumberText : styles.stepNumber}>
                                1
                            </Text>
                        )}
                    </View>
                </View>
                <View style={[styles.line, currentStep >= 2 && styles.activeLine]} />
                <View style={styles.stepWrapper}>
                    <View
                        style={[
                            styles.step,
                            currentStep >= 2 && styles.activeStep,
                            currentStep === 2 && styles.activeStepNumber,
                        ]}
                    >
                        {currentStep > 2 ? (
                            <Ionicons name="checkmark" size={24} color="#fff" />
                        ) : (
                            <Text style={currentStep === 2 ? styles.activeStepNumberText : styles.stepNumber}>
                                2
                            </Text>
                        )}
                    </View>
                </View>
                <View style={[styles.line, currentStep >= 3 && styles.activeLine]} />
                <View style={styles.stepWrapper}>
                    <View
                        style={[
                            styles.step,
                            currentStep >= 3 && styles.activeStep,
                            currentStep === 3 && styles.activeStepNumber,
                        ]}
                    >
                        {currentStep > 3 ? (
                            <Ionicons name="checkmark" size={24} color="#fff" />
                        ) : (
                            <Text style={currentStep === 3 ? styles.activeStepNumberText : styles.stepNumber}>
                                3
                            </Text>
                        )}
                    </View>
                </View>
                <View style={[currentStep >= 4 ]} />
            </View>

            {currentStep === 1 && (
                <View style={styles.stepContent}>
                    <Text style={styles.header}>Masalının Temasını Seç</Text>
                    <View style={styles.characterContainer}>
                        {theme.map((theme, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.characterBox,
                                    selectedCharacter === theme.name && styles.selectedCharacter,
                                ]}
                                onPress={() => setSelectedCharacter(theme.name)}
                            >
                                <Image source={theme.image} style={theme.style} />
                                <Text style={styles.characterName}>{theme.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.buttonContainerSingle}>
                        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                            <Text style={styles.buttonText}>Devam Et</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {currentStep === 2 && (
                <View style={styles.stepContent}>
                <Text style={styles.header}>Karakterini Seç</Text>
                <View style={styles.characterContainer}>
                    {characters.map((character, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.characterBox,
                                selectedCharacter === character.name && styles.selectedCharacter,
                            ]}
                            onPress={() => setSelectedCharacter(character.name)}
                        >
                            <Image source={character.image} style={character.style} />
                            <Text style={styles.characterName}>{character.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                     <TouchableOpacity style={styles.buttonBack} onPress={handlePreviousStep}>
                         <Text style={styles.buttonTextBack}>Geri Dön</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                         <Text style={styles.buttonText}>Devam Et</Text>
                     </TouchableOpacity>
                 </View>
            </View>
            )}

            {currentStep === 3 && (
                <View style={styles.stepContent}>
                    <Text style={styles.header}>Masalının Başlangıcını Yaz</Text>
                    <View style={styles.subtitleContainer}>
                    <Image
                        source={require('../assets/images/kalem.png')} // Kalem resmini buraya ekle
                        style={styles.subtitleIcon}
                    />
                        <View style={styles.subtitleTextContainer}>
                            <Text style={styles.subtitleTitle}>Macera</Text>
                        </View>
                    </View>
                    {/* Masal Başlangıcı Giriş Kutusu */}
                    <TextInput
                        style={styles.input}
                        placeholder="Bir zamanlar, küçük bir kasabada yaşayan Cesim adında çok meraklı bir çocuk varmış..."
                        placeholderTextColor="#aaa"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        returnKeyType="done"
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Enter') {
                                Keyboard.dismiss(); // Klavyeyi kapat
                            }
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonBack} onPress={handlePreviousStep}>
                            <Text style={styles.buttonTextBack}>Geri Dön</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                            <Text style={styles.buttonText}>Oluştur</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {currentStep === 4 && (
                <View style={styles.stepContent}>
                <Text style={styles.header1}>Masalın Oluşturuluyor...</Text>
                <View style={styles.buttonContainer1}>
                     <TouchableOpacity style={styles.buttonBack1} onPress={handlePreviousStep}>
                         <Text style={styles.buttonTextBack1}>Geri Dön</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.button1} onPress={handleNextStep}>
                         <Text style={styles.buttonText1}>Tamam</Text>
                     </TouchableOpacity>
                 </View>
            </View>
            )}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop:50,
    },
    stepWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    step: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    activeStep: {
        borderColor: '#6c63ff',
        backgroundColor: '#6c63ff',
    },
    stepNumber: {
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: '#6c63ff',
    },
    activeStepNumberText: {
        fontFamily: 'ms-bold',
        fontSize: 18,
        color: '#fff',
    },
    line: {
        height: 2,
        width: 90,
        backgroundColor: '#ccc',
    },
    activeLine: {
        backgroundColor: '#6c63ff',
    },
    stepContent: {
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontFamily: 'ms-bold',
        color: '#6c63ff',
        marginBottom: 30,
        maxWidth:250,
        textAlign:'center'
    },
    header1: {
        fontSize: 30,
        fontFamily: 'ms-bold',
        color: '#6c63ff',
        marginBottom: 30,
        maxWidth:250,
        textAlign:'center',
        marginTop:160,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'ms-regular',
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    characterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    characterBox: {
        width: 170,
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    selectedCharacter: {
        borderColor: '#6c63ff',
        borderWidth: 2,
    },
    characterImage: {
        width: 120,
        height: 120,
        marginBottom: 15,
        resizeMode: 'contain',
    },
    cesimImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
        borderRadius: 15,
    },
    rabbitImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    gizemImage: {
        width: 100,
        height: 100,
        marginBottom: 30,
        borderRadius: 15,
        resizeMode:'contain'
    },
    characterName: {
        fontFamily: 'ms-regular',
        fontSize: 18,
        color: '#333',
    },
    buttonContainerSingle: {
        alignItems: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 200,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#6c63ff',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ms-bold',
    },
    buttonBack: {
        backgroundColor: 'transparent',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 50,
    },
    buttonTextBack: {
        color: '#6c63ff',
        fontSize: 16,
        fontFamily: 'ms-regular',
    },
    button1: {
        backgroundColor: '#6c63ff',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 50,
    },
    buttonText1: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ms-bold',
    },
    buttonBack1: {
        backgroundColor: 'transparent',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 50,
    },
    buttonTextBack1: {
        color: '#6c63ff',
        fontSize: 16,
        fontFamily: 'ms-regular',
    },
    //step3
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f0f4ff',
        padding: 15,
        marginBottom: -25,
        width: '100%',
        alignSelf: 'center',
        alignItems:'center',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        borderWidth: 1,
        borderColor: '#6c63ff',
    },
    subtitleIcon: {
        marginRight: 10,
        width:50,
        height:50,
        marginBottom:10,
    },
    subtitleTextContainer: {
        flex: 1,
    },
    subtitleTitle: {
        fontSize: 20,
        fontFamily: 'ms-bold',
        color: '#6c63ff',
        marginBottom:10,
    },

    input: {
        height: 200,
        width:'100%',
        fontSize: 14,
        fontFamily: 'ms-regular',
        color: '#333',
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 10,
        borderWidth: 1,
        borderColor: '#6c63ff',
    },
    
});

export default MasalGeneratePage;
