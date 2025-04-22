import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert,TextInput,KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard, } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Tik ikonu için
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://masal-backend-on7u.onrender.com';
const MasalGeneratePage = ({ route, navigation }) => {
    const [currentStep, setCurrentStep] = useState(1); // Aktif adım
    const [selectedCharacter, setSelectedCharacter] = useState(null); 
    const [characterInput, setCharacterInput] = useState('');
    const [characters, setCharacters] = useState([]);
    const [title, setTitle] = useState('');
    const [starter, setStarter] = useState('');
    const [selectedTheme, setSelectedTheme] = useState(); 


    const addCharacter = () => {
        const trimmed = characterInput.trim();
        if (trimmed && !characters.includes(trimmed)) {
          setCharacters([...characters, trimmed]);
          setCharacterInput('');
        }
      };
      const handleGenerateStory = async () => {
        if (!title || !starter || !selectedTheme || characters.length === 0) {
          Alert.alert("Eksik Bilgi", "Tüm alanları doldurmalısın!");
          return;
        }
      
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.post(
            'https://masal-backend-on7u.onrender.com/ai/generate',
            {
              title,
              theme: selectedTheme,
              characters,
              starter,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          const fullStory = response.data.fullStory;
          navigation.navigate('StoryResult', {
            fullStory,
            title,
            characters,
            theme: selectedTheme,
          });
      
        } catch (err) {
          Alert.alert("Hata", "Masal oluşturulurken bir sorun oluştu.");
          console.error(err);
        }
      };
      const handleNextStep = () => {
        if (currentStep === 1 && !selectedTheme) {
          Alert.alert('Hata', 'Lütfen bir tema seçin!');
          return;
        }
      
        if (currentStep === 2 && characters.length === 0) {
          Alert.alert('Hata', 'Lütfen en az bir karakter ekleyin.');
          return;
        }
      
        if (currentStep === 3 && (!title.trim() || !starter.trim())) {
          Alert.alert('Hata', 'Lütfen başlık ve başlangıç cümlesi girin.');
          return;
        }
      
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          handleGenerateStory(); // ✅ AI'ya gönder
        }
      };
      

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const theme = [
        { name: 'macera', label: 'Macera' },
        { name: 'dostluk', label: 'Dostluk' },
        { name: 'bilgelik', label: 'Bilgelik' },
        { name: 'doğa', label: 'Doğa' },
        { name: 'hayvanlar', label: 'Hayvanlar' },
        { name: 'aile', label: 'Aile' },
        { name: 'sihir', label: 'Sihir' },
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
                {theme.map((item, index) => (
                    <TouchableOpacity
                    key={index}
                    style={[
                        styles.characterBox,
                        selectedTheme === item.name && styles.selectedCharacter,
                    ]}
                    onPress={() => setSelectedTheme(item.name)}
                    >
                    <Text style={styles.characterName}>{item.label}</Text>
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
    <Text style={styles.header}>Karakter(lerini) Yaz</Text>

    <TextInput
      style={styles.inputShort}
      placeholder="Karakter adı gir (örn: Prenses)"
      value={characterInput}
      onChangeText={setCharacterInput}
      onSubmitEditing={addCharacter}
      returnKeyType="done"
    />

    <TouchableOpacity style={styles.addButton} onPress={addCharacter}>
      <Text style={styles.addButtonText}>Ekle</Text>
    </TouchableOpacity>

    <View style={styles.characterTagContainer}>
      {characters.map((char, index) => (
        <View key={index} style={styles.characterTag}>
          <Text style={styles.characterTagText}>{char}</Text>
        </View>
      ))}
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonBack} onPress={handlePreviousStep}>
        <Text style={styles.buttonTextBack}>Geri Dön</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (characters.length === 0) {
            Alert.alert('Hata', 'Lütfen en az bir karakter ekleyin.');
            return;
          }
          handleNextStep();
        }}
      >
        <Text style={styles.buttonText}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  </View>
)}


{currentStep === 3 && (
  <View style={styles.stepContent}>
    <Text style={styles.header}>Masalının Detaylarını Yaz</Text>

    <TextInput
      style={styles.inputShort}
      placeholder="Masal Başlığı (örn: Ay Işığı Kraliçesi)"
      placeholderTextColor="#aaa"
      value={title}
      onChangeText={setTitle}
    />

    <View style={styles.subtitleContainer}>
      <Image
        source={require('../assets/images/kalem.png')}
        style={styles.subtitleIcon}
      />
      <View style={styles.subtitleTextContainer}>
        <Text style={styles.subtitleTitle}>Başlangıç Cümlesi</Text>
      </View>
    </View>

    <TextInput
      style={styles.input}
      placeholder="Bir zamanlar, küçük bir köyde yaşayan meraklı bir çocuk varmış..."
      placeholderTextColor="#aaa"
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      value={starter}
      onChangeText={setStarter}
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
    },
    characterBox: {
        width: 170,
        height: 120,
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
    //karakter girmece
    inputShort: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        padding: 14,
        borderRadius: 12,
        fontFamily: 'ms-regular',
        fontSize: 16,
        marginBottom: 10,
        width: '100%',
      },
      
      addButton: {
        backgroundColor: '#6c63ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignSelf: 'center',
        marginBottom: 20,
      },
      
      addButtonText: {
        color: '#fff',
        fontFamily: 'ms-bold',
        fontSize: 16,
      },
      
      characterTagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
      },
      
      characterTag: {
        backgroundColor: '#eae8ff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        margin: 5,
      },
      
      characterTagText: {
        fontFamily: 'ms-regular',
        color: '#6c63ff',
      }
      
    
});

export default MasalGeneratePage;
