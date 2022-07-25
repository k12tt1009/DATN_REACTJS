import React, { Component } from 'react';
import { connect } from "react-redux";
import './Price.scss';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';

class Price extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <>
                <HomeHeader />
                <div className='title-price'>BẢNG GIÁ DỊCH VỤ HUYNDAI</div>
                <table id="TablePrice">
                    <tbody>
                        <tr className='menu-price'>
                            <th>Tên xe</th>
                            <th>Hạng mục</th>
                            <th>Loại</th>
                            <th>Giá</th>
                        </tr>

                        <tr >
                            <td>Huyndai</td>
                            <td>Cân chỉnh độ chụm</td>
                            <td>Nhân công</td>
                            <td>450.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Huyndai</td>
                            <td>Vá, ra vào lốp</td>
                            <td>Nhân công</td>
                            <td>60.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Huyndai</td>
                            <td>Dầu castrol gtx</td>
                            <td>Vật tư</td>
                            <td>120.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Huyndai</td>
                            <td>Cốc lọc giấy hd santafe 26320</td>
                            <td>Vật tư</td>
                            <td>250.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Huyndai</td>
                            <td>215/70R16 HK IDDR18</td>
                            <td>Vật tư</td>
                            <td>1.950.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Huyndai</td>
                            <td>Ắc quy Atlas 90 R</td>
                            <td>Vật tư</td>
                            <td>2.130.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Getz</td>
                            <td>Nạp ga điều hòa</td>
                            <td>Vật tư</td>
                            <td>600.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Getz</td>
                            <td>Dầu lạnh</td>
                            <td>Vật tư</td>
                            <td>200.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Getz</td>
                            <td>Công đại tu hệ thống điều hòa</td>
                            <td>Nhân công</td>
                            <td>1.500.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai i10</td>
                            <td>Cân chỉnh độ chụm</td>
                            <td>Nhân công</td>
                            <td>200.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai i10</td>
                            <td>165/65R14 MCL Xm2</td>
                            <td>Vật tư</td>
                            <td>1.000.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai I10 1.2</td>
                            <td>Giàn lạnh</td>
                            <td>Vật tư</td>
                            <td>2.100.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai I10 1.2</td>
                            <td>Công tháo taplo phục vụ sửa điều hòa</td>
                            <td>Nhân công</td>
                            <td>700.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai I10 1.2</td>
                            <td>Phin lọc ga</td>
                            <td>Vật tư</td>
                            <td>350.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai I20</td>
                            <td>Công tháo lắp, thay thế</td>
                            <td>Nhân công</td>
                            <td>200.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai I20</td>
                            <td>Công thay dầu</td>
                            <td>Nhân công</td>
                            <td>50.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Santafe</td>
                            <td>Công tháo lắp đèn</td>
                            <td>Nhân công</td>
                            <td>200.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Santafe</td>
                            <td>Cảm biến ABS sau lái tháo rời trên bi</td>
                            <td>Vật tư</td>
                            <td>850.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Santafe</td>
                            <td>Dầu máy dầu JB GERMAN OIL</td>
                            <td>Vật tư</td>
                            <td>200.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Santafe</td>
                            <td>Lọc dầu sắt Santafe</td>
                            <td>Vật tư</td>
                            <td>200.000 VNĐ</td>
                        </tr>

                        <tr >
                            <td>Hyundai Santafe</td>
                            <td>Sơn lazang 2 màu đen trắng</td>
                            <td>Nhân công</td>
                            <td>600.000 VNĐ</td>
                        </tr>
                    </tbody>

                </table>
                <HomeFooter />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Price);
