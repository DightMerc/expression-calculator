function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  expr = expr.replace(/ /g, '').replace(/-/g, 'minus');

  let openBracketsCount = 0,
    closeBracketsCount = 0;

  expr.split('').forEach(item => {
    switch (item) {
      case '(':
        openBracketsCount++;
        break;

      case ')':
        closeBracketsCount++;
        break;
    }
  });

  if (openBracketsCount !== closeBracketsCount) {
    throw new Error('ExpressionError: Brackets must be paired');
  }

  const parseBrackets = (expr) => {

    if (expr.lastIndexOf('(') >= 0) {
      let firstBracketIndex = expr.lastIndexOf('('),
        lastBracketIndex = expr.indexOf(')', firstBracketIndex + 1),
        exprInsideBrackets = expr.slice(firstBracketIndex + 1, lastBracketIndex),
        result = parseFloat(parsePlus(exprInsideBrackets));

      if (!isFinite(result)) {
        throw new Error('TypeError: Division by zero.');
      }

      expr = expr.replace('(' + exprInsideBrackets + ')', result);

      return parseBrackets(expr);
    }

    return parsePlus(expr);
  }

  const parsePlus = (expr) => {
    return expr.split('+')
      .map(item => parseMinus(item))
      .reduce((acc, item) => +acc + +item)
  };

  const parseMinus = (expr) => {
    return expr.split('minus')
      .map(item => parseMultiply(item))
      .reduce((acc, item) => acc - item)
  };

  const parseMultiply = (expr) => {
    return expr.split('*')
      .map(item => parseDivide(item))
      .reduce((acc, item) => acc * item)
  };

  const parseDivide = (expr) => {
    return expr.split('/')
      .reduce((acc, item) => acc / item)
  };

  if (!isFinite(parseBrackets(expr))) {
    throw new Error('TypeError: Division by zero.');
  }

  return parseBrackets(expr);
}

module.exports = {
  expressionCalculator
}
