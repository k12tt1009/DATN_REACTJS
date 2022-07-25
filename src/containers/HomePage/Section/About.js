import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";


class About extends Component {
    state = {
        openWeather: false,
    }

    handleToggleWeather = () => {
        this.setState({ openWeather: !this.state.openWeather });
    }

    render() {

        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Review Trải Nghiệm Bảo Dưỡng Tại Xưởng Hyundai
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="95%" height="400px" src="https://www.youtube.com/embed/s65CcuQWrqM"
                            title="YouTube video player" frameBorder="0" allow="accelerometer; 
                    autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>Đẳng cấp, chuyên nghiệp và tiện nghi là những điều mà khách hàng
                            sẽ cảm nhận được mỗi khi trải nghiệm các sản phẩm và dịch vụ
                            tại Xưởng dịch vụ Hyundai Quảng Ninh. Không chỉ đầu tư nhiều
                            hạng mục chuyên biệt theo tiêu chuẩn Hàn Quốc mới nhất,
                            các khu vực chức năng còn đáp ứng được tối đa nhu cầu của
                            quý khách hàng về bảo hành, bảo dưỡng, sửa chữa và phụ tùng
                            chính hãng. </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
