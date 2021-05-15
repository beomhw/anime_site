// 전체 컴포넌트 종합 => 라우트 컴포넌트
import Navigation from './Navigation';
import {LanguageProvider} from './LanguageContext';

const App = () => {
    return (
        <LanguageProvider>
            <Navigation />
        </LanguageProvider>
    )
}

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉         
           ＼ ', !-─‐-i  /  /´         welcome!!
           ／｀ｰ'       L/／｀ヽ､       
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);

export default App;