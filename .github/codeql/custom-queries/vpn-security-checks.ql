/**
 * @name VPN Security Vulnerability Detection
 * @description Detects VPN-specific security vulnerabilities and encryption weaknesses
 * @kind problem
 * @problem.severity warning
 * @security-severity 8.0
 * @precision high
 * @id js/vpn-security-check
 * @tags security
 *       external/cwe/cwe-327
 *       external/cwe/cwe-338
 *       external/cwe/cwe-200
 */

import javascript

// Check for weak encryption algorithms
class WeakCryptographyCall extends CallExpr {
  WeakCryptographyCall() {
    exists(string methodName |
      methodName = this.getCalleeName() and
      (
        methodName.regexpMatch(".*md5.*|.*sha1.*|.*des.*|.*rc4.*") or
        methodName = "createCipher" or
        methodName = "createDecipher"
      )
    )
  }
}

// Check for hardcoded credentials or keys
class HardcodedCredential extends StringLiteral {
  HardcodedCredential() {
    exists(VarDecl varDecl, string varName |
      varDecl.getADeclarator().getId().getName() = varName and
      this = varDecl.getADeclarator().getInit() and
      (
        varName.regexpMatch(".*(?i)(key|password|secret|token|api[_-]?key).*") or
        this.getValue().regexpMatch(".*[A-Za-z0-9]{20,}.*")
      )
    )
  }
}

// Check for insecure random number generation
class WeakRandomCall extends CallExpr {
  WeakRandomCall() {
    this.getCalleeName() = "random" and
    this.getReceiver().(GlobalVarAccess).getName() = "Math"
  }
}

// Check for insecure connection protocols
class InsecureProtocol extends StringLiteral {
  InsecureProtocol() {
    this.getValue().regexpMatch(".*http://.*|.*ftp://.*|.*telnet://.*")
  }
}

// Check for potential DNS leaks
class PotentialDNSLeak extends CallExpr {
  PotentialDNSLeak() {
    exists(string methodName |
      methodName = this.getCalleeName() and
      methodName.regexpMatch(".*resolve.*|.*lookup.*") and
      not exists(StringLiteral hostname |
        hostname = this.getArgument(0) and
        hostname.getValue().regexpMatch(".*\\.onion$")
      )
    )
  }
}

// Check for logging sensitive information
class SensitiveLogging extends CallExpr {
  SensitiveLogging() {
    exists(string methodName, Expr arg |
      methodName = this.getCalleeName() and
      methodName.regexpMatch(".*log.*|.*print.*|.*console.*") and
      arg = this.getAnArgument() and
      arg.toString().regexpMatch(".*(?i)(password|key|secret|token|ip|address).*")
    )
  }
}

from Expr vulnerability, string message
where
  (
    vulnerability instanceof WeakCryptographyCall and
    message = "Weak cryptographic algorithm detected. Use strong encryption for VPN security."
  ) or
  (
    vulnerability instanceof HardcodedCredential and
    message = "Hardcoded credential detected. Use secure key management instead."
  ) or
  (
    vulnerability instanceof WeakRandomCall and
    message = "Weak random number generation. Use cryptographically secure random for VPN keys."
  ) or
  (
    vulnerability instanceof InsecureProtocol and
    message = "Insecure protocol detected. All VPN connections should use secure protocols."
  ) or
  (
    vulnerability instanceof PotentialDNSLeak and
    message = "Potential DNS leak detected. Ensure all DNS queries go through VPN tunnel."
  ) or
  (
    vulnerability instanceof SensitiveLogging and
    message = "Sensitive information in logs detected. Avoid logging private VPN data."
  )
select vulnerability, message