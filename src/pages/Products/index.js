import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Button, Alert} from 'react-native';
import Modal from 'react-native-modal';

/*My Components*/
import {NewText, styles} from '../Style';
import Api from '../../Api';
import List from '../../components/productComponents/List';
import MenuHeader from '../../components/menuComponents/MenuHeader';
import ProductsOrder from '../../components/productComponents/ProductsOrder';
import ProductContext from '../../contexts/ProductContext';
import CloseButton from '../../components/form/CloseButton';
import ProductDataInput from '../../components/productComponents/productDataInput';
import LineGraphic from '../../components/finances/LineGraphic';

export default function Products({route, navigation}) {
	const {UserId} = route.params;

	const [data, setData] = useState({});
	const [products, setProducts] = useState({});
	const [error, setError] = useState({});
	const [orderNum, setOrderNum] = useState(1);
	const [order, setOrder] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	const [graphicModalVisible, setGraphicModalVisible] = useState(false);
	const [ProductData, setProductData] = useState([]);
	const [toDelete, setToDelete] = useState('');
	const [updateData, setUpdateData] = useState({});
	const refresh = false;

	const OnDeleteAlert = () => {
		Alert.alert(
			'Espera ai',
			`Você Realmente quer DELETAR o(a) ${ProductData.Name}?`,
			[
				{
					text: 'não',
					onPress: () => null,
					style: 'cancel',
				},
				{text: 'sim', onPress: () => setToDelete(ProductData.id)},
			],
		);
		return true;
	};

	/*UseEffect: toDelete*/
	useEffect(() => {
		async function DeleteData() {
			try {
				var DeleteInfo = {userId: UserId, DeleteId: toDelete};
				const response = await Api.post('/products/deleteOne', DeleteInfo);
				setData(response.data.message);
				setModalVisible(false);
			} catch (err) {
				console.error(err);
				setError(err);
			}
		}
		DeleteData();
	}, [toDelete]);

	/*UseEffect: data*/
	useEffect(() => {
		async function FetchData() {
			try {
				var UserID = {userId: UserId};
				const response = await Api.post('/products/GetAll', UserID);
				setProducts(response.data);
				setData('');
			} catch (err) {
				console.error(err);
				setError(err);
			}
		}
		FetchData();
	}, [data]);

	/*UseEffect: updateData*/
	useEffect(() => {
		async function Update() {
			try {
				let updateDataLength = JSON.stringify(updateData).length;
				let UpdateJSON =
					'{"id":' +
					ProductData.id +
					',"userId":' +
					UserId +
					',' +
					JSON.stringify(updateData).substring(1, updateDataLength - 1) +
					'}';
				const response = await Api.post(
					'products/Update',
					JSON.parse(UpdateJSON),
				);
				setData(response.data.message);
			} catch (err) {
				console.error(err);
				setError(err);
			}
		}
		if (Object.values(updateData).length !== 0) {
			Update();
		}
	}, [updateData]);

	/*UseEffect: orderNum,products*/
	useEffect(() => {
		if (Object.values(products).length !== 0) {
			if (products.message == 'Not Found') {
				setError({
					register: 'Pelo visto você ainda não Cadastrou nenhum produto',
				});
			} else if (orderNum == 1) {
				setOrder(products.sort((a, b) => a.Name.localeCompare(b.Name)));
			} else if (orderNum == 2) {
				setOrder(products.sort((a, b) => b.Name.localeCompare(a.Name)));
			} else if (orderNum == 3) {
				setOrder(
					products.sort((a, b) => {
						return a.Value - b.Value;
					}),
				);
			} else if (orderNum == 4) {
				setOrder(
					products.sort((a, b) => {
						return b.Value - a.Value;
					}),
				);
			}
		}
	}, [orderNum, products]);

	/*Front Page*/
	return (
		<View style={styles.container}>
			<MenuHeader
				refresh={refresh}
				userId={UserId}
				navigation={navigation}
				route={route}
			/>
			{error.register && (
				<Text style={{color: '#ebb89b'}}>{error.register}</Text>
			)}

			<ProductContext.Provider
				value={{
					setModalVisible,
					ProductData,
					setProductData,
					setUpdateData,
					setOrder,
					setOrderNum,
					orderNum,
					products,
				}}>
				<View style={styles.ListHeaderStyle}>
					<ProductsOrder Order={orderNum} Op={'1'} Name={'Nome'} />
					<ProductsOrder Order={orderNum} Op={'2'} Name={'Preço'} />
					<Modal isVisible={modalVisible}>
						<View
							style={{
								backgroundColor: '#471023',
								padding: 10,
								borderRadius: 5,
							}}>
							<CloseButton OnPressFunction={() => setModalVisible(false)} />

							<ProductDataInput
								TrueName={'Code'}
								Name={'Código'}
								Data={ProductData.Code}
								KeyboardType={'numeric'}
							/>
							<ProductDataInput
								TrueName={'Name'}
								Name={'Nome'}
								Data={ProductData.Name}
								KeyboardType={'default'}
							/>
							<ProductDataInput
								TrueName={'Value'}
								Name={'Preço'}
								Data={ProductData.Value}
								KeyboardType={'numeric'}
							/>
							<ProductDataInput
								TrueName={'Description'}
								Name={'Descrição'}
								Data={ProductData.Description}
								KeyboardType={'default'}
							/>
							<ProductDataInput
								TrueName={'Type'}
								Name={'Tipo'}
								Data={ProductData.Type}
								KeyboardType={'default'}
							/>
							<ProductDataInput
								TrueName={'TotalAmount'}
								Name={'Total no Estoque'}
								Data={ProductData.TotalAmount}
								KeyboardType={'numeric'}
							/>
							<Button
								title={`Deletar ${ProductData.Type}`}
								color="#960306"
								onPress={() => OnDeleteAlert()}
							/>
							<Button
								title={`Ver Vendas do ${ProductData.Type}`}
								color="#22c973"
								onPress={() => setGraphicModalVisible(true)}
							/>
						</View>
					</Modal>

					<Modal isVisible={graphicModalVisible}>
						<View
							style={{
								backgroundColor: '#471023',
								padding: 10,
								borderRadius: 5,
							}}>
							<CloseButton
								OnPressFunction={() => setGraphicModalVisible(false)}
							/>
							<NewText>
								Vendas{'\n'}
								{ProductData.Name}
							</NewText>
							<View style={{alignItems: 'center'}}>
								<LineGraphic
									data={{
										RawData: {
											userId: UserId,
											ProductPrice: ProductData.Value,
											ProductId: ProductData.id,
										},
										Type: 'Product',
									}}
								/>
							</View>
						</View>
					</Modal>
				</View>
				<FlatList
					data={order}
					renderItem={({item}) => <List all={item} />}
					keyExtractor={item => item.id}
				/>
			</ProductContext.Provider>
		</View>
	);
}
