import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Database, Globe, UserCheck, GitBranch } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-vpn-secure" />
          Privacy Policy
          <Badge variant="default" className="ml-auto">
            Made by Xeyronox
          </Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()} | Effective immediately
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-vpn-cyber-blue" />
            Our Commitment to Privacy
          </h2>
          <div className="p-4 rounded-lg bg-vpn-secure/10 border border-vpn-secure/20">
            <p className="text-sm leading-relaxed">
              SecureVault VPN, developed by <strong>Xeyronox</strong>, is committed to protecting your privacy 
              and ensuring your digital security. This privacy policy explains how we collect, use, and 
              safeguard your information when you use our VPN service. We believe in complete transparency 
              and zero-knowledge architecture.
            </p>
          </div>
        </section>

        {/* Data Collection */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-vpn-cyber-blue" />
            Data Collection & Usage
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-vpn-secure mb-2">✅ What We DON'T Collect</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Your browsing history or website visits</li>
                <li>• DNS queries or requests</li>
                <li>• Connection timestamps or session durations</li>
                <li>• Bandwidth usage or traffic content</li>
                <li>• Your real IP address while connected</li>
                <li>• Any personally identifiable information</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-vpn-connecting mb-2">ℹ️ What We Collect (Minimal)</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Anonymous usage statistics (total users, server load)</li>
                <li>• Technical diagnostics for service improvement</li>
                <li>• Aggregated performance metrics</li>
                <li>• Error logs (no personal data included)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="w-5 h-5 text-vpn-cyber-blue" />
            Security & Encryption
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-vpn-secure mb-2">🔐 Encryption Standards</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• AES-256-GCM encryption</li>
                <li>• RSA-4096 key exchange</li>
                <li>• Perfect Forward Secrecy</li>
                <li>• Quantum-resistant protocols</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-vpn-secure mb-2">🛡️ Security Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• DNS leak protection</li>
                <li>• IPv6 leak protection</li>
                <li>• Kill switch functionality</li>
                <li>• Auto-healing security system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Zero-Knowledge Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Eye className="w-5 h-5 text-vpn-cyber-blue" />
            Zero-Knowledge Architecture
          </h2>
          <div className="p-4 rounded-lg bg-vpn-cyber-blue/10 border border-vpn-cyber-blue/20">
            <p className="text-sm leading-relaxed mb-3">
              Our zero-knowledge architecture ensures that even we cannot access your data:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-vpn-secure" />
                <span>All encryption happens on your device before transmission</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-vpn-secure" />
                <span>We cannot decrypt your traffic even if compelled</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-vpn-secure" />
                <span>No logs are stored on our servers</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-vpn-secure" />
                <span>Distributed infrastructure with no central logging</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5 text-vpn-cyber-blue" />
            Data Sharing & Third Parties
          </h2>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <h3 className="font-semibold text-destructive mb-2">🚫 We NEVER Share Your Data</h3>
            <p className="text-sm leading-relaxed">
              We do not sell, rent, lease, or otherwise disclose your personal information to third parties. 
              We do not work with advertising companies, data brokers, or analytics providers that could 
              compromise your privacy. Your data stays with you, always.
            </p>
          </div>
        </section>

        {/* Jurisdiction & Compliance */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-vpn-cyber-blue" />
            Jurisdiction & Compliance
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold mb-2">🌍 Jurisdiction</h3>
              <p className="text-sm text-muted-foreground">
                SecureVault VPN operates under privacy-friendly jurisdiction with strong data protection laws. 
                We are not subject to mandatory data retention laws or mass surveillance programs.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold mb-2">📋 Compliance Standards</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• GDPR compliant (EU)</li>
                <li>• CCPA compliant (California)</li>
                <li>• SOC 2 Type II certified</li>
                <li>• ISO 27001 security standards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* User Rights */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-vpn-cyber-blue" />
            Your Rights
          </h2>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Request deletion of any data we may have (though we collect minimal data)</li>
              <li>• Access information about what data we collect</li>
              <li>• Opt-out of any non-essential data collection</li>
              <li>• Port your data to another service</li>
              <li>• File complaints with data protection authorities</li>
            </ul>
          </div>
        </section>

        {/* Contact & Updates */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-vpn-cyber-blue" />
            Contact & Updates
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold mb-2">📞 Contact Information</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For privacy-related questions or concerns, contact the developer:
              </p>
              <ul className="space-y-1 text-sm">
                <li><strong>Developer:</strong> Xeyronox</li>
                <li><strong>GitHub:</strong> <a href="https://github.com/Xeyronox" target="_blank" rel="noopener noreferrer" className="text-vpn-cyber-blue hover:underline">github.com/Xeyronox</a></li>
                <li><strong>Security Contact:</strong> security@xeyronox.dev</li>
                <li><strong>Privacy Officer:</strong> privacy@xeyronox.dev</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold mb-2">🔄 Policy Updates</h3>
              <p className="text-sm text-muted-foreground">
                We will notify users of any material changes to this privacy policy through the application 
                and our GitHub repository. Continued use of the service after updates constitutes acceptance 
                of the revised policy.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 SecureVault VPN by Xeyronox. All rights reserved.
            </p>
            <Badge variant="outline" className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              Open Source
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicy;