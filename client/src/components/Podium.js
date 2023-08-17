//images
import jjbean from '../images/jj_bean.png'
import bean from '../images/bean.png'
import loafe from '../images/loafe.png'
import greatdane from '../images/great-dane.png'
import boulevard from '../images/boulevard.png'


const Podium = ({reviews}) => {

    const getPercentage = (allReviews, name) => {
        var goodCount = 0
        if (!allReviews) {
            return 0
        }
        const filteredReviews = allReviews.filter(r => r.shop === name)
        if (filteredReviews.length === 0) {
            return 0
        }
        filteredReviews.forEach((r) => {
            if (r.rating === 'Fresh ✅') {
                goodCount++
            }
        })
        var percentage = goodCount / filteredReviews.length * 100
        return Math.round(percentage)
    }

    const topShops = (reviews) => {
        const shops = [
            {name: 'Loafe Cafe', percentage: getPercentage(reviews, 'Loafe Cafe')},
            {name: 'JJ Bean', percentage: getPercentage(reviews, 'JJ Bean')},
            {name: 'Bean Around The World', percentage: getPercentage(reviews, 'Bean Around The World')},
            {name: 'Great Dane Coffee', percentage: getPercentage(reviews, 'Great Dane Coffee')},
            {name: 'Boulevard', percentage: getPercentage(reviews, 'Boulevard')}
        ]
        return shops.sort((a, b) => b.percentage - a.percentage)
        
    }

    const getSource = (name) => {
        switch (name) {
            case 'JJ Bean':
                return jjbean
            case 'Bean Around The World':
                return bean
            case 'Loafe Cafe':
                return loafe
            case 'Great Dane Coffee':
                return greatdane
            case 'Boulevard':
                return boulevard
            default:
                return ''
        }
    }


    return (
        <div className="standings">
            <h2 className="standings-header">Standings</h2>
            <div className="podium">
                <div className="second-place">
                    <img 
                        src={getSource(topShops(reviews)[1].name)} 
                        alt={topShops(reviews)[1].name}
                        className="shop-logo">
                    </img>
                    <h2>{topShops(reviews)[1].name} - {topShops(reviews)[1].percentage}%</h2>
                    <div className="second-podium"></div>
                </div>
                <div className="first-place">
                <img 
                        src={getSource(topShops(reviews)[0].name)} 
                        alt={topShops(reviews)[0].name}
                        className="shop-logo">
                    </img>
                    <h2>{topShops(reviews)[0].name} - {topShops(reviews)[0].percentage}%</h2>
                    <div className="first-podium"></div>
                </div>
                <div className="third-place">
                    <img 
                        src={getSource(topShops(reviews)[2].name)} 
                        alt={topShops(reviews)[2].name}
                        className="shop-logo">
                    </img>
                    <h2>{topShops(reviews)[2].name} - {topShops(reviews)[2].percentage}%</h2>
                    <div className="third-podium"></div>
                </div>
            </div>
            <div className="break"></div>
            <div className="runners-up">
                <div>
                    <p>4. {topShops(reviews)[3].name} - {topShops(reviews)[3].percentage}%</p>
                    <p>5. {topShops(reviews)[4].name} - {topShops(reviews)[4].percentage}%</p>
                </div>
            </div>
        </div>

    )
}

export default Podium