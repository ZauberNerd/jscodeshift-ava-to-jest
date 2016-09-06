import utils from './utils'

const replaceTdotNot = (j, root) => {
  const tDotIs = root.find(j.MemberExpression, {
    object: {
      name: 't'
    },
    property: {
      name: 'not'
    }
  })
  tDotIs.forEach(expectation => {
    // Get the entire 't.not(actual, expected)' expression
    const expectationExpression = expectation.parentPath
    const actualValue = utils.getValue(expectationExpression.value.arguments[0])
    const expectedValue = utils.getValue(expectationExpression.value.arguments[1])
    const newExpect = j.callExpression(
      j.identifier('expect'),
      [j.identifier(actualValue)]
    )
    const not = j.identifier('not')
    const newExpectNot = j.memberExpression(
      newExpect, not
    )
    const newActual = j.callExpression(
      j.identifier('toBe'),
      [j.identifier(expectedValue)]
    )
    const newExpression = j.memberExpression(
      newExpectNot, newActual
    )
    expectationExpression.replace(newExpression)
  })
}

export default replaceTdotNot